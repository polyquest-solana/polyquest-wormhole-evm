import * as dotenv from "dotenv";
import * as hre from "hardhat";
import { ChainId, CHAINS } from "@certusone/wormhole-sdk";
import { getAddr, nativeChainId, WormholeChainId } from "./constant";
import { betCrossChain } from "../backend/bettingCrossChain";
dotenv.config();


const sendMessageToSolana = async (address: string, marketKey: number, answerKey: number, bettingToken: string, amount: number) => {
    const contract = await hre.ethers.getContractAt("WormholeBridge", address);
    const fee = await contract.getMessageFee();

    const wsol = await hre.ethers.getContractAt("IERC20", bettingToken);
    console.log("Users call approve first to lock their assets in smart contract");
    const tx_approve = await wsol.approve(address, amount);
    await tx_approve.wait();

    console.log("Users call evm contract to send their cross chain message");
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


const main = async (sendChain: ChainId, bettingToken: string, amount: number, marketKey: number, answerKey: number) => {
    const senderContractAddress = getAddr("WORMHOLE_INTEGRATION", nativeChainId[sendChain as WormholeChainId]);
    console.log('Wormhole Integration address: ', senderContractAddress);
    const seq = await sendMessageToSolana(senderContractAddress, marketKey, answerKey, bettingToken, amount);

    await betCrossChain(sendChain, senderContractAddress, marketKey, seq);
}

const amount = 1000, marketKey = 1, answerKey = 1; // CHANGE
const sendChain = CHAINS.bsc; // CHANGE
const bettingToken = "0x66a00769800E651E9DbbA384d2B41A45A9660912" // CHANGE
main(sendChain, bettingToken, amount, marketKey, answerKey);