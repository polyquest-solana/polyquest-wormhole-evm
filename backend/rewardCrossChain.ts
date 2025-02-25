
import * as solanaWormhole from "@certusone/wormhole-sdk/lib/cjs/solana/wormhole";
import { BN, Program } from "@coral-xyz/anchor";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  PublicKeyInitData,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import IDL from "../program/sender.json";
import { Sender } from "../program/sender";
import {
  deriveAddress,
  getTransferNativeWithPayloadCpiAccounts,
} from "@certusone/wormhole-sdk/lib/cjs/solana";
import { createSyncNativeInstruction, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import secretKey from "../wallet.json";
import { ChainId, CONTRACTS } from "@certusone/wormhole-sdk";


const WORMHOLE_CONTRACTS = CONTRACTS["TESTNET"];
const CORE_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.core);
const TOKEN_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.token_bridge);
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const program = new Program(IDL as Sender, {
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

export const transferCrossChain = async (
  recipientChain: ChainId,
  recipientWallet: string,
  recipientContractAddress: string,
  mint: PublicKey,
  amount: number
) => {
  let recipientAddress = new Uint8Array(32);
  recipientAddress.set(Buffer.from(recipientWallet.slice(2), "hex"), 12);
  let recipientContract = new Uint8Array(32);
  recipientContract.set(
    Buffer.from(recipientContractAddress.slice(2), "hex"),
    12
  );
  const tracker = await solanaWormhole.getProgramSequenceTracker(
    connection,
    TOKEN_BRIDGE_PID,
    CORE_BRIDGE_PID
  );

  console.log("Sequence: ", tracker.sequence);

  const message = deriveTokenTransferMessageKey(
    program.programId,
    tracker.sequence + 1n
  );

  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, payer.publicKey);
  let wsolBalance = await connection.getBalance(fromTokenAccount.address, 'confirmed');
  if(wsolBalance >= amount) {
    console.log("Backend will wrap sol to transfer cross chain");
    const wrapTx = new Transaction()
      .add(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: fromTokenAccount.address,
            lamports: amount
          }),
          createSyncNativeInstruction(
            fromTokenAccount.address
        )
      )

    const wrapSig = await sendAndConfirmTransaction(connection, wrapTx, [payer]);
    console.log("wrapTx signature: ", wrapSig);
  }

  const tokenBridgeAccounts = getTransferNativeWithPayloadCpiAccounts(
    program.programId,
    TOKEN_BRIDGE_PID,
    CORE_BRIDGE_PID,
    payer.publicKey,
    message,
    fromTokenAccount.address,
    mint
  );
  const accounts = {
    config: deriveSenderConfigKey(program.programId),
    foreignContract: deriveForeignContractKey(
      program.programId,
      recipientChain
    ),
    tmpTokenAccount: deriveTmpTokenAccountKey(program.programId, mint),
    tokenBridgeProgram: TOKEN_BRIDGE_PID,
    ...tokenBridgeAccounts,
  };
  console.log("Backend will call transfer cross chain to send reward to users");
  const tx = await program.methods
    .transferCrossChain(
      0,
      new BN(amount),
      [...recipientAddress],
      recipientChain,
      [...recipientContract]
    )
    .accounts(accounts)
    .transaction();

  const signature = await sendAndConfirmTransaction(
    connection,
    tx,
    [payer] // Keypair sử dụng để ký giao dịch
  );
  console.log('Transfer cross chain tx: ', signature);
  return signature;
};