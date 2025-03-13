import hre from "hardhat";
import { wormhole } from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import * as dotenv from "dotenv";
import { ChainId, getAddr, nativeChainId } from "../scripts/constant";

dotenv.config();

describe("WormholeBridge", function () {
  let contract: any;
  beforeEach(async () => {
    let contractAddress = getAddr("WORMHOLE_INTEGRATION", 84532 as ChainId);
    contract = await hre.ethers.getContractAt("WormholeBridge", contractAddress);
  })

  it("Should change emitter address", async () => {
    const wh = await wormhole('Testnet', [evm, solana]);
    const chain = wh.getChain('Solana');
    console.log(chain.config.chainId);

    let [msgId] = await chain.parseTransaction('3uEtfUGs71tPPdiLeVxMVrCTHK2HoKAFTGohmD7ehFjWNu1kpmntA2mgAy4hFNR18kiMzcMrPA9KQhbbj6C8PxUo');
    let VM = await wh.getVaa(msgId, 'TokenBridge:TransferWithPayload', 1000000);
    const tx = await contract.registerSender(chain.config.chainId, VM!.emitterAddress.toUint8Array(), { gasLimit: 1e6 });
    await tx.wait();
    console.log(tx);
  })

  // it("Should claim token by vaa", async () => {
  //   const wh = await wormhole('Testnet', [evm, solana]);
  //   const chain = wh.getChain('Solana');
  //   console.log(chain.config.chainId);

  //   let [msgId] = await chain.parseTransaction('4azfuuo8RVrxzJLDfS5xpfK2vYBAk6c3uPuTmYUoBMqTvdMsaBX2cS5UGKKXNbs2xEonYnspxTMwBF2eXcftcsDb');
  //   let vaaBytes = await wh.getVaaBytes(msgId, 2592000);
  //   let tx = await contract.redeemTransferWithPayload(vaaBytes, {gasLimit: 1e6});
  //   await tx.wait();
  //   console.log(tx);
  // })
});