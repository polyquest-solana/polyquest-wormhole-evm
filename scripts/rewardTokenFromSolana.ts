import { ChainId, parseTokenTransferPayload } from "@certusone/wormhole-sdk";
import { wormhole } from "@wormhole-foundation/sdk";
import solana from "@wormhole-foundation/sdk/solana";
import { WormholeBridge } from "../typechain-types";
import * as dotenv from "dotenv";
import { getAddr, nativeChainId, WormholeChainId } from "./constant";
import { claimCrossChain } from "../backend/rewardCrossChain";
import { NATIVE_MINT } from "@solana/spl-token";
import { task } from "hardhat/config";
dotenv.config();


const receiveRewardFromSolana = async (
  contract: WormholeBridge,
  sig: string
) => {
  const wh = await wormhole('Testnet', [solana]);
  const chain = wh.getChain('Solana');
  let [msgId] = await chain.parseTransaction(sig);
  let vaaBytes = await wh.getVaaBytes(msgId, 2592000);
  // let vaa = await wh.getVaa(msgId, "TokenBridge:TransferWithPayload", 60000);
  // console.log(await contract.decodePayload(vaa?.payload.payload));
  console.log("Users call evm contract to redeem reward");
  let tx = await contract.redeemTransferWithPayload(vaaBytes!, { gasLimit: 1e6 });
  await tx.wait();
  console.log('Final evm tx', tx);
}

const main = async (contract: WormholeBridge, recipientChain: ChainId, marketKey: number, answerKey: number, totalLocked: bigint) => {
  const sig = await claimCrossChain(
    recipientChain,
    process.env.PUBLIC_KEY!,
    NATIVE_MINT,
    marketKey,
    answerKey,
    Number(totalLocked)
  );

  await receiveRewardFromSolana(contract, sig);
}

task("reward", "Test receiving reward cross-chain")
.addPositionalParam("chain")
.addPositionalParam('token')
.addPositionalParam("marketKey")
.addPositionalParam("answerKey")
.setAction(async (taskAgrs, hre) => {
  let recipientContractAddress = getAddr("WORMHOLE_INTEGRATION", nativeChainId[taskAgrs.chain as WormholeChainId]);
  console.log('Wormhole Integration address: ', recipientContractAddress);

  let contract = await hre.ethers.getContractAt("WormholeBridge", recipientContractAddress);
  let totalLocked = BigInt(1e8);
  await main(contract, taskAgrs.chain, taskAgrs.marketKey, taskAgrs.answerKey, totalLocked);
})