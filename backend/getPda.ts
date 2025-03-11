import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import IDL from "../program/market.json";
import { ForecastMarket } from "../program/market";
import { Program } from "@coral-xyz/anchor";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const forecastMarketProgram = new Program(IDL as ForecastMarket, {
    connection: connection,
});

export const configPDA = () => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("config")],
        forecastMarketProgram.programId
    )[0];
}

export const marketPDA = (marketKey: BN) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("market"), marketKey.toArrayLike(Buffer, "le", 8)],
      forecastMarketProgram.programId
    )[0];
}

export const answerPDA = (marketKey: BN) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("answer"), marketKey.toArrayLike(Buffer, "le", 8)],
      forecastMarketProgram.programId
    )[0];
}


export const foreignEmitterPDA = (chainId: number) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("foreign_emitter"), new BN(chainId).toArrayLike(Buffer, "le", 2)],
      forecastMarketProgram.programId
    )[0];
}

export const bettingCrossChainPDA = (chainId: number, userAddr: Uint8Array, marketKey: number, answerKey: number) => {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("betting_cross_chain"),
        new BN(chainId).toArrayLike(Buffer, "le", 2),
        new BN(marketKey).toArrayLike(Buffer, "le", 8),
        new BN(answerKey).toArrayLike(Buffer, "le", 8),
        userAddr,
      ],
      forecastMarketProgram.programId
    )[0];
}

export const receivedPDA = (chainId: number, sequence: BN) => {
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