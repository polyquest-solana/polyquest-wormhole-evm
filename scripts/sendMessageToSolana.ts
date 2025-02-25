import * as dotenv from "dotenv";
import { ChainId } from "@certusone/wormhole-sdk";
import { getAddr, nativeChainId, WormholeChainId } from "./constant";
import { betCrossChain } from "../backend/bettingCrossChain";
import { task } from "hardhat/config";
import { WormholeBridge } from "../typechain-types";
dotenv.config();


const sendMessageToSolana = async (contract: WormholeBridge, marketKey: number, answerKey: number, bettingToken: string, amount: number) => {
    const fee = await contract.getMessageFee();

    console.log("Users call evm contract to send their cross-chain message");
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
    console.log("User's evm tx: ", tx);
    const sequence = Buffer.from(receipt!.logs[1].data.slice(2, 66), 'hex');
    return Number(sequence.readBigInt64BE(24));
}


const main = async (contract: WormholeBridge, sendChain: ChainId, bettingToken: string, amount: number, marketKey: number, answerKey: number) => {
    const seq = await sendMessageToSolana(contract, marketKey, answerKey, bettingToken, amount);

    await betCrossChain(sendChain, contract.address, marketKey, seq);
}

task("bet", "Test betting cross-chain")
.addPositionalParam("chain")
.addPositionalParam("token")
.addPositionalParam("amount")
.addPositionalParam("market")
.addPositionalParam("answer")
.setAction(async (taskAgrs, hre) => {
  let recipientContractAddress = getAddr("WORMHOLE_INTEGRATION", nativeChainId[taskAgrs.chain as WormholeChainId]);
  console.log('Wormhole Integration address: ', recipientContractAddress);
  let contract = await hre.ethers.getContractAt("WormholeBridge", recipientContractAddress);

  const wsol = await hre.ethers.getContractAt("IERC20", taskAgrs.token);
  console.log("Users call approve first to lock their assets in smart contract");
  const tx_approve = await wsol.approve(contract.address, taskAgrs.amount);
  await tx_approve.wait();
  await main(contract, taskAgrs.chain, taskAgrs.token, taskAgrs.amount, taskAgrs.market, taskAgrs.answer);
})