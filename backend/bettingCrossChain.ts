import { BN, Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import IDL from "../program/market.json";
import { ForecastMarket } from "../program/market";
import secretKey from "../wallet.json";
import { derivePostedVaaKey } from "@certusone/wormhole-sdk/lib/cjs/solana/wormhole";
import { NodeWallet } from "@certusone/wormhole-sdk/lib/cjs/solana";
import { postVaa } from "@certusone/wormhole-sdk/lib/cjs/solana/sendAndConfirmPostVaa";
import { CONTRACTS, parseVaa, SignedVaa } from "@certusone/wormhole-sdk";
import { answerPDA, bettingCrossChainPDA, configPDA, foreignEmitterPDA, marketPDA, receivedPDA } from "./getPda";


const WORMHOLE_CONTRACTS = CONTRACTS["TESTNET"];
const CORE_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.core);
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const forecastMarketProgram = new Program(IDL as ForecastMarket, {
    connection: connection,
});

const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));

export const betCrossChain = async (chainId: number, userAddr: string, emitterAddr: string, marketKey: number) => {
    const signedVaaUrl = `https://api.testnet.wormscan.io/api/v1/vaas/${chainId}/${emitterAddr}`;
    const response = await fetch(signedVaaUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as any;
    console.log('Vaa: ', data.data[0]);

    const signedVaaUint8Array: SignedVaa = new Uint8Array(
      Buffer.from(data.data[0].vaa, "base64")
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
        Buffer.from(data.data[0].vaa, "base64")
      );
      console.log("PostVaa pda created");
    }

    console.log("Backend will call bet cross-chain to update betting data of users from evm chains");
    let recipientAddress = new Uint8Array(20);
    recipientAddress.set(Buffer.from(userAddr.slice(2), "hex"));
    const tx = await forecastMarketProgram.methods
    .betCrossChain([...parsedVaa.hash], [...recipientAddress])
      .accountsPartial({
        polyquestOwner: payer.publicKey,
        configAccount: configPDA(),
        marketAccount: marketPDA(new BN(marketKey)),
        answerAccount: answerPDA(new BN(marketKey)),
        wormholeProgram: new PublicKey(CORE_BRIDGE_PID),
        posted: derivePostedVaaKey(CORE_BRIDGE_PID, parsedVaa.hash),
        betCrossChainAccount: bettingCrossChainPDA(
          parsedVaa.emitterChain,
          recipientAddress
        ),
        foreignEmitter: foreignEmitterPDA(parsedVaa.emitterChain),
      })
      .transaction();
    const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
    console.log("Bet cross-chain tx: ", sig);
}