import * as hre from "hardhat";
import { ChainId, CHAINS } from "@certusone/wormhole-sdk";
import { wormhole } from "@wormhole-foundation/sdk";
import solana from "@wormhole-foundation/sdk/solana";
import { WormholeBridge } from "../typechain-types";
import * as dotenv from "dotenv";
import { getAddr, nativeChainId, WormholeChainId } from "./constant";
import { transferCrossChain } from "../backend/rewardCrossChain";
import { NATIVE_MINT } from "@solana/spl-token";
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

const main = async (recipientChain: ChainId, amount: number) => {
  let recipientContractAddress = getAddr("WORMHOLE_INTEGRATION", nativeChainId[recipientChain as WormholeChainId]);
  console.log('Wormhole Integration address: ', recipientContractAddress);

  const sig = await transferCrossChain(
    recipientChain,
    process.env.PUBLIC_KEY!,
    recipientContractAddress,
    NATIVE_MINT,
    amount
  );

  let contract = await hre.ethers.getContractAt("WormholeBridge", recipientContractAddress);
  await receiveRewardFromSolana(contract, sig);
}

const recipientChain = CHAINS.base_sepolia; // CHANGE
const amount = 1_000_000; // CHANGE
main(recipientChain, amount);
