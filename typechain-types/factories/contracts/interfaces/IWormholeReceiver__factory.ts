/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IWormholeReceiver,
  IWormholeReceiverInterface,
} from "../../../contracts/interfaces/IWormholeReceiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "additionalMessages",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "sourceAddress",
        type: "bytes32",
      },
      {
        internalType: "uint16",
        name: "sourceChain",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "deliveryHash",
        type: "bytes32",
      },
    ],
    name: "receiveWormholeMessages",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IWormholeReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IWormholeReceiverInterface {
    return new Interface(_abi) as IWormholeReceiverInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IWormholeReceiver {
    return new Contract(address, _abi, runner) as unknown as IWormholeReceiver;
  }
}
