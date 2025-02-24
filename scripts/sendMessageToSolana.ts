import { BN, Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import { wormhole } from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/evm";
import * as hre from "hardhat";
import IDL from "../program/market.json";
import { ForecastMarket } from "../program/market";
import secretKey from "../wallet.json";
import * as dotenv from "dotenv";
import { ChainId, CHAINS, CONTRACTS, parseVaa, SignedVaa } from "@certusone/wormhole-sdk";
import { derivePostedVaaKey } from "@certusone/wormhole-sdk/lib/cjs/solana/wormhole";
import { NodeWallet } from "@certusone/wormhole-sdk/lib/cjs/solana";
import { postVaa } from "@certusone/wormhole-sdk/lib/cjs/solana/sendAndConfirmPostVaa";
import { getAddr, nativeChainId, WormholeChainId } from "./constant";
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

const sendMessageToSolana = async (address: string, marketKey: number, answerKey: number, bettingToken: string, amount: number) => {
    const contract = await hre.ethers.getContractAt("WormholeBridge", address);
    const fee = await contract.getMessageFee();

    const wsol = await hre.ethers.getContractAt("IERC20", bettingToken);
    const tx_approve = await wsol.approve(address, amount);
    await tx_approve.wait();

    const tx = await contract.sendMessageToSolana(
      bettingToken, // betting token
      amount,
      marketKey,
      answerKey,
      {
        gasLimit: 1e6, 
        value: fee
      }
    );
    const receipt = await tx.wait();
    const sequence = Buffer.from(receipt!.logs[1].data.slice(2, 66), 'hex');
    return Number(sequence.readBigInt64BE(24));
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
        // marketAccount: marketPDA(new BN(marketKey)),
        // answerAccount: answerPDA(new BN(marketKey)),
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
    const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
    console.log("Bet cross chain: ", sig);
}

const main = async (sendChain: ChainId, bettingToken: string, amount: number, marketKey: number, answerKey: number) => {
    const senderContractAddress = getAddr("WORMHOLE_INTEGRATION", nativeChainId[sendChain as WormholeChainId]);
    const seq = await sendMessageToSolana(senderContractAddress, marketKey, answerKey, bettingToken, amount);

    await betCrossChain(sendChain, senderContractAddress, marketKey, seq);
}

const amount = 1000, marketKey = 1, answerKey = 1; // CHANGE
const sendChain = CHAINS.bsc; // CHANGE
const bettingToken = "0x66a00769800E651E9DbbA384d2B41A45A9660912" // CHANGE
main(sendChain, bettingToken, amount, marketKey, answerKey);