import * as hre from "hardhat";
import * as solanaWormhole from "@certusone/wormhole-sdk/lib/cjs/solana/wormhole";
import { BN, Program } from "@coral-xyz/anchor";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
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
  getTokenBridgeDerivedAccounts,
  getTransferNativeWithPayloadCpiAccounts,
} from "@certusone/wormhole-sdk/lib/cjs/solana";
import { ChainId, CHAINS, CONTRACTS } from "@certusone/wormhole-sdk";
import { createSyncNativeInstruction, getOrCreateAssociatedTokenAccount, NATIVE_MINT } from "@solana/spl-token";
import secretKey from "../wallet.json";
import { wormhole } from "@wormhole-foundation/sdk";
import solana from "@wormhole-foundation/sdk/solana";
import { WormholeBridge } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();


const WORMHOLE_CONTRACTS = CONTRACTS["TESTNET"];
const CORE_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.core);
const TOKEN_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.token_bridge);
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const program = new Program(IDL as Sender, {
  connection: connection,
});

const recipientChain = CHAINS.arbitrum_sepolia;
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
  console.log(chainBuffer);
  return deriveAddress([seedPrefix, chainBuffer], programId);
}

export function deriveSenderConfigKey(programId: PublicKeyInitData) {
  return deriveAddress([Buffer.from("sender")], programId);
}

const init = async () => {
  const tokenBridgeAccounts = getTokenBridgeDerivedAccounts(
    program.programId,
    TOKEN_BRIDGE_PID,
    CORE_BRIDGE_PID
  );
  const accounts = {
    owner: payer.publicKey,
    senderConfig: deriveSenderConfigKey(program.programId),
    tokenBridgeProgram: TOKEN_BRIDGE_PID,
    wormholeProgram: CORE_BRIDGE_PID,
    ...tokenBridgeAccounts,
  };
  const tx = await program.methods
    .initializeBridge(0, 100_000_000)
    .accounts(accounts)
    .instruction();
  const transaction = new Transaction().add(tx);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);
  console.log("Signature Init: ", signature);
};

const transfer = async (
  recipientWallet: string,
  recipientContractAddress: string,
  mint: PublicKey
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
  const solTransferTransaction = new Transaction()
    .add(
      SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: fromTokenAccount.address,
          lamports: LAMPORTS_PER_SOL
        }),
        createSyncNativeInstruction(
          fromTokenAccount.address
      )
    )

  await sendAndConfirmTransaction(connection, solTransferTransaction, [payer]);

  const tokenBridgeAccounts = getTransferNativeWithPayloadCpiAccounts(
    program.programId,
    TOKEN_BRIDGE_PID,
    CORE_BRIDGE_PID,
    payer.publicKey,
    message,
    fromTokenAccount,
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
  const tx = await program.methods
    .transferCrossChain(
      0,
      new BN(123456789),
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
  return signature;
};

const registerSolanaSender = async (
  contract: WormholeBridge,
  sig: string
) => {
  const wh = await wormhole('Testnet', [solana]);
  const chain = wh.getChain('Solana');
  let [msgId] = await chain.parseTransaction(sig);
  let VM = await wh.getVaa(msgId, 'TokenBridge:TransferWithPayload', 1000000);
  const tx = await contract.registerSender(chain.config.chainId, VM!.emitterAddress.toUint8Array());
  await tx.wait();
}

const receiveRewardFromSolana = async (
  contract: WormholeBridge,
  sig: string
) => {
  const wh = await wormhole('Testnet', [solana]);
  const chain = wh.getChain('Solana');
  let [msgId] = await chain.parseTransaction(sig);
  let vaaBytes = await wh.getVaaBytes(msgId, 2592000);
  let tx = await contract.redeemTransferWithPayload(vaaBytes!, { gasLimit: 1e6 });
  await tx.wait();
}

const main = async () => {
  // await init();
  const sig = await transfer(
    "0xc0489CE75b6C23E664F0Bf27E5677A353796cE38",
    process.env.WORMHOLE_BASE_BRIDGE_ADDRESS!,
    NATIVE_MINT
  );
  
  let contract = await hre.ethers.getContractAt("WormholeBridge", process.env.WORMHOLE_BASE_BRIDGE_ADDRESS!);
  // await registerSolanaSender(contract, sig);
  await receiveRewardFromSolana(contract, sig);
}

main();
