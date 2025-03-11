
import * as solanaWormhole from "@certusone/wormhole-sdk/lib/cjs/solana/wormhole";
import { BN, Program } from "@coral-xyz/anchor";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  PublicKeyInitData,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import IDL from "../program/market.json";
import { ForecastMarket } from "../program/market";
import {
  deriveAddress,
  getTransferNativeWithPayloadCpiAccounts,
} from "@certusone/wormhole-sdk/lib/cjs/solana";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import secretKey from "../wallet.json";
import { ChainId, CONTRACTS } from "@certusone/wormhole-sdk";
import { answerPDA, bettingCrossChainPDA, configPDA, foreignEmitterPDA, marketPDA } from "./getPda";


const WORMHOLE_CONTRACTS = CONTRACTS["TESTNET"];
const CORE_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.core);
const TOKEN_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.token_bridge);
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const program = new Program(IDL as ForecastMarket, {
  connection: connection,
});

const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));

const deriveTmpTokenAccountKey = (
  programId: PublicKeyInitData,
  mint: PublicKeyInitData
) => {
  return deriveAddress(
    [Buffer.from("tmp"), new PublicKey(mint).toBuffer()],
    programId
  );
}

const deriveTokenTransferMessageKey = (
  programId: PublicKeyInitData,
  sequence: bigint
) => {
  return deriveAddress(
    [
      Buffer.from("bridged"),
      (() => {
        const buf = Buffer.alloc(8);
        buf.writeBigUInt64LE(sequence);
        return buf;
      })(),
    ],
    programId
  );
}

export function deriveForeignContractKey(
  programId: PublicKey,
  chainId: ChainId
) {
  const seedPrefix = Buffer.from("foreign_contract");
  const chainBuffer = Buffer.alloc(2);
  chainBuffer.writeUInt16LE(chainId, 0); // chainId vào Buffer theo little endian
  return deriveAddress([seedPrefix, chainBuffer], programId);
}

export function deriveSenderConfigKey(programId: PublicKeyInitData) {
  return deriveAddress([Buffer.from("sender")], programId);
}

export const claimCrossChain = async (
  recipientChain: ChainId,
  recipientWallet: string,
  mint: PublicKey,
  marketKey: number,
  answerKey: number,
  amount: number
) => {
  let recipientAddress = new Uint8Array(20);
  recipientAddress.set(Buffer.from(recipientWallet.slice(2), "hex"));
  const tracker = await solanaWormhole.getProgramSequenceTracker(
    connection,
    TOKEN_BRIDGE_PID,
    CORE_BRIDGE_PID
  );

  const message = deriveTokenTransferMessageKey(
    program.programId,
    tracker.sequence + 1n
  );

  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, payer.publicKey);
  const tokenBridgeAccounts = getTransferNativeWithPayloadCpiAccounts(
    program.programId,
    TOKEN_BRIDGE_PID,
    CORE_BRIDGE_PID,
    payer.publicKey,
    message,
    fromTokenAccount.address,
    mint
  );
  let marketAccount = marketPDA(new BN(marketKey));
  let configAccount = configPDA();

  console.log("Backend will call transfer cross-chain to send reward to users");
  const tx = await program.methods
    .claimCrossChain(
      new BN(amount)
    )
    .accountsPartial({
      polyquestOwner: payer.publicKey,
      configAccount,
      marketAccount,
      config: deriveSenderConfigKey(program.programId),
      answerAccount: answerPDA(new BN(marketKey)),
      betMint: mint,
      rewardMint: mint,
      foreignEmitter: foreignEmitterPDA(recipientChain),
      betAccount: bettingCrossChainPDA(
        recipientChain,
        recipientAddress,
        marketKey,
        answerKey
      ),
      vaultBetTokenAccount: (await getOrCreateAssociatedTokenAccount(connection, payer, mint, marketAccount, true)).address,
      vaultRewardTokenAccount: (await getOrCreateAssociatedTokenAccount(connection, payer, mint, configAccount, true)).address,
      tmpTokenAccount: deriveTmpTokenAccountKey(program.programId, mint),
      tokenBridgeProgram: TOKEN_BRIDGE_PID,
      ...tokenBridgeAccounts,
    })
    .transaction();

  const signature = await sendAndConfirmTransaction(
    connection,
    tx,
    [payer] // Keypair sử dụng để ký giao dịch
  );
  console.log('Transfer cross-chain tx: ', signature);
  return signature;
};