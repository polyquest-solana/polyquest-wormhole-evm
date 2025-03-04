import { ChainId } from "@certusone/wormhole-sdk";
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
  console.log("Users call evm contract to redeem reward");
  let tx = await contract.redeemTransferWithPayload(vaaBytes!, { gasLimit: 1e6 });
  await tx.wait();
  console.log('Final evm tx', tx);
}

const main = async (contract: WormholeBridge, recipientChain: ChainId, marketKey: number, sequence: number, totalLocked: bigint) => {
  const sig = await claimCrossChain(
    recipientChain,
    process.env.PUBLIC_KEY!,
    contract.address,
    NATIVE_MINT,
    marketKey,
    Number(totalLocked),
    sequence
  );

  await receiveRewardFromSolana(contract, sig);
}

task("reward", "Test receiving reward cross-chain")
.addPositionalParam("chain")
.addPositionalParam("marketKey")
.addPositionalParam("sequence")
.setAction(async (taskAgrs, hre) => {
  let recipientContractAddress = getAddr("WORMHOLE_INTEGRATION", nativeChainId[taskAgrs.chain as WormholeChainId]);
  console.log('Wormhole Integration address: ', recipientContractAddress);

  let contract = await hre.ethers.getContractAt("WormholeBridge", recipientContractAddress);
  let totalLocked = await contract.totalLocked();
  await main(contract, taskAgrs.chain, taskAgrs.marketKey, totalLocked, taskAgrs.sequence);
})