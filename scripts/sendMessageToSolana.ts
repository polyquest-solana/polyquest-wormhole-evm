import { BN, Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import { wormhole } from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/evm";
import * as hre from "hardhat";
import IDL from "../program/market.json";
import { ForecastMarket } from "../program/market";
import secretKey from "../wallet.json";
import * as dotenv from "dotenv";
import { CONTRACTS, parseVaa, SignedVaa } from "@certusone/wormhole-sdk";
import { derivePostedVaaKey } from "@certusone/wormhole-sdk/lib/cjs/solana/wormhole";
import { NodeWallet } from "@certusone/wormhole-sdk/lib/cjs/solana";
import { postVaa } from "@certusone/wormhole-sdk/lib/cjs/solana/sendAndConfirmPostVaa";
dotenv.config();


const WORMHOLE_CONTRACTS = CONTRACTS["TESTNET"];
const CORE_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.core);
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const forecastMarketProgram = new Program(IDL as ForecastMarket, {
    connection: connection,
});
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));

const configPDA = () => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("config")],
        forecastMarketProgram.programId
    )[0];
}

const marketPDA = (marketKey: BN) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("market"), marketKey.toArrayLike(Buffer, "le", 8)],
      forecastMarketProgram.programId
    )[0];
}

const answerPDA = (marketKey: BN) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("answer"), marketKey.toArrayLike(Buffer, "le", 8)],
      forecastMarketProgram.programId
    )[0];
}

const foreignEmitterPDA = (chainId: number) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("foreign_emitter"), new BN(chainId).toArrayLike(Buffer, "le", 2)],
      forecastMarketProgram.programId
    )[0];
}

const bettingCrossChainPDA = (chainId: number, sequence: BN) => {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("betting_cross_chain"),
        new BN(chainId).toArrayLike(Buffer, "le", 2),
        sequence.toArrayLike(Buffer, "le", 8),
      ],
      forecastMarketProgram.programId
    )[0];
}

const receivedPDA = (chainId: number, sequence: BN) => {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("received"), // SEED_PREFIX giống `Received::SEED_PREFIX`
        (() => {
          const buf = Buffer.alloc(2);
          buf.writeUInt16LE(chainId, 0); // Convert chainId to LE, 2 bytes
          return buf;
        })(),
        sequence.toArrayLike(Buffer, "le", 8), // sequence.to_le_bytes()
      ],
      forecastMarketProgram.programId
    )[0];
  }

const sendMessageToSolana = async (address: string, marketKey: number, answerKey: number, bettingKey: number, bettingToken: string, targetChain: number, amount: number) => {
    const contract = await hre.ethers.getContractAt("WormholeBridge", address);
    const fee = await contract.quoteEVMDeliveryCost(targetChain);
    const tx = await contract.sendMessageToEvm(
      bettingToken, // betting token
      amount,
      marketKey,
      answerKey,
      bettingKey,
      targetChain,
      process.env.WORMHOLE_BASE_BRIDGE_ADDRESS!,
      {
        gasLimit: 1e6, 
        value: fee
      }
    );
    const receipt = await tx.wait();
    const sequence = Buffer.from(receipt!.logs[1].data.slice(2, 66), 'hex');
    return Number(sequence.readBigInt64BE(24));
}

const registerEmitter = async (emitterAddr: string, chainId: number) => {
    let emitterArr = new Uint8Array(32);
    emitterArr.set(Buffer.from(emitterAddr.slice(2), "hex"), 12);

    const tx = await forecastMarketProgram.methods
      .addForeignEmitter(chainId, [...emitterArr])
      .accountsPartial({
        owner: payer.publicKey,
        configAccount: configPDA(),
        emitterAccount: foreignEmitterPDA(chainId),
      })
      .transaction();
    return tx;
}

const betCrossChain = async (chainId: number, emitterAddr: string, marketKey: number, sequence: number) => {
    const signedVaaUrl = `https://api.testnet.wormscan.io/v1/signed_vaa/${chainId}/${emitterAddr}/${sequence}`;
    const response = await fetch(signedVaaUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as any;
    const signedVaaUint8Array: SignedVaa = new Uint8Array(
      Buffer.from(data.vaaBytes, "base64")
    );

    const parsedVaa = parseVaa(signedVaaUint8Array);
    const PostVaaAccount = derivePostedVaaKey(CORE_BRIDGE_PID, parsedVaa.hash);

    let accountInfo = await connection.getAccountInfo(PostVaaAccount);
    if (!accountInfo) {
      const wallet = NodeWallet.fromSecretKey(payer.secretKey);
      await postVaa(
        connection,
        wallet.signTransaction,
        CORE_BRIDGE_PID,
        wallet.key(),
        Buffer.from(data.vaaBytes, "base64")
      );
    }

    const tx = await forecastMarketProgram.methods
    .betCrossChain([...parsedVaa.hash])
      .accountsPartial({
        polyquestOwner: payer.publicKey,
        configAccount: configPDA(),
        marketAccount: marketPDA(new BN(marketKey)),
        answerAccount: answerPDA(new BN(marketKey)),
        wormholeProgram: new PublicKey(CORE_BRIDGE_PID),
        posted: derivePostedVaaKey(CORE_BRIDGE_PID, parsedVaa.hash),
        betCrossChainAccount: bettingCrossChainPDA(
          parsedVaa.emitterChain,
          new BN(parsedVaa.sequence.toString())
        ),
        foreignEmitter: foreignEmitterPDA(parsedVaa.emitterChain),
        received: receivedPDA(
          parsedVaa.emitterChain,
          new BN(parsedVaa.sequence.toString())
        )
      })
      .transaction();

    await sendAndConfirmTransaction(connection, tx, [payer]);
}

const main = async () => {
    const wh = await wormhole('Testnet', [evm]);
    const amount = 10, marketKey = 1, answerKey = 2, bettingKey = 3;
    const targetChain = wh.getChain("BaseSepolia").config.chainId;
    const bettingToken = "0x66a00769800E651E9DbbA384d2B41A45A9660912" // WSOL
    const seq = await sendMessageToSolana(process.env.WORMHOLE_BASE_BRIDGE_ADDRESS!, marketKey, answerKey, bettingKey, bettingToken, targetChain, amount);

    // await registerEmitter(process.env.WORMHOLE_BASE_BRIDGE_ADDRESS!, targetChain);
    await betCrossChain(targetChain, process.env.WORMHOLE_BASE_BRIDGE_ADDRESS!, marketKey, seq);
}

main();