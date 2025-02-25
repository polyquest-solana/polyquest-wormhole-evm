import { BN, Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import IDL from "../program/market.json";
import { ForecastMarket } from "../program/market";
import secretKey from "../wallet.json";
import { derivePostedVaaKey } from "@certusone/wormhole-sdk/lib/cjs/solana/wormhole";
import { NodeWallet } from "@certusone/wormhole-sdk/lib/cjs/solana";
import { postVaa } from "@certusone/wormhole-sdk/lib/cjs/solana/sendAndConfirmPostVaa";
import { CONTRACTS, parseVaa, SignedVaa } from "@certusone/wormhole-sdk";


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

export const betCrossChain = async (chainId: number, emitterAddr: string, marketKey: number, sequence: number) => {
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
      console.log("Backend will call postVaa to create postvaa pda");
      await postVaa(
        connection,
        wallet.signTransaction,
        CORE_BRIDGE_PID,
        wallet.key(),
        Buffer.from(data.vaaBytes, "base64")
      );
      console.log("PostVaa pda created");
    }

    console.log("Backend will call bet cross-chain to update betting data of users from evm chains");
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
    console.log("Bet cross-chain tx: ", sig);
}