/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ITokenMinter,
  ITokenMinterInterface,
} from "../../../contracts/interfaces/ITokenMinter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "burnLimitsPerMessage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "sourceIdHash",
        type: "bytes32",
      },
    ],
    name: "remoteTokensToLocalTokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ITokenMinter__factory {
  static readonly abi = _abi;
  static createInterface(): ITokenMinterInterface {
    return new Interface(_abi) as ITokenMinterInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ITokenMinter {
    return new Contract(address, _abi, runner) as unknown as ITokenMinter;
  }
}
