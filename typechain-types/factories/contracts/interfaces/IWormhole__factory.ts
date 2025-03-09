/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IWormhole,
  IWormholeInterface,
} from "../../../contracts/interfaces/IWormhole";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "nonce",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "consistencyLevel",
        type: "uint8",
      },
    ],
    name: "LogMessagePublished",
    type: "event",
  },
  {
    inputs: [],
    name: "chainId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentGuardianSetIndex",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
    ],
    name: "getGuardianSet",
    outputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "keys",
            type: "address[]",
          },
          {
            internalType: "uint32",
            name: "expirationTime",
            type: "uint32",
          },
        ],
        internalType: "struct IWormhole.GuardianSet",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGuardianSetExpiry",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "governanceActionIsConsumed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "governanceChainId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "governanceContract",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "impl",
        type: "address",
      },
    ],
    name: "isInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "messageFee",
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
        internalType: "bytes",
        name: "encodedVM",
        type: "bytes",
      },
    ],
    name: "parseAndVerifyVM",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "timestamp",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "nonce",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "emitterChainId",
            type: "uint16",
          },
          {
            internalType: "bytes32",
            name: "emitterAddress",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sequence",
            type: "uint64",
          },
          {
            internalType: "uint8",
            name: "consistencyLevel",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "payload",
            type: "bytes",
          },
          {
            internalType: "uint32",
            name: "guardianSetIndex",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "guardianIndex",
                type: "uint8",
              },
            ],
            internalType: "struct IWormhole.Signature[]",
            name: "signatures",
            type: "tuple[]",
          },
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
        ],
        internalType: "struct IWormhole.VM",
        name: "vm",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "valid",
        type: "bool",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedVM",
        type: "bytes",
      },
    ],
    name: "parseVM",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "timestamp",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "nonce",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "emitterChainId",
            type: "uint16",
          },
          {
            internalType: "bytes32",
            name: "emitterAddress",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sequence",
            type: "uint64",
          },
          {
            internalType: "uint8",
            name: "consistencyLevel",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "payload",
            type: "bytes",
          },
          {
            internalType: "uint32",
            name: "guardianSetIndex",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "guardianIndex",
                type: "uint8",
              },
            ],
            internalType: "struct IWormhole.Signature[]",
            name: "signatures",
            type: "tuple[]",
          },
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
        ],
        internalType: "struct IWormhole.VM",
        name: "vm",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "nonce",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "consistencyLevel",
        type: "uint8",
      },
    ],
    name: "publishMessage",
    outputs: [
      {
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "guardianIndex",
            type: "uint8",
          },
        ],
        internalType: "struct IWormhole.Signature[]",
        name: "signatures",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address[]",
            name: "keys",
            type: "address[]",
          },
          {
            internalType: "uint32",
            name: "expirationTime",
            type: "uint32",
          },
        ],
        internalType: "struct IWormhole.GuardianSet",
        name: "guardianSet",
        type: "tuple",
      },
    ],
    name: "verifySignatures",
    outputs: [
      {
        internalType: "bool",
        name: "valid",
        type: "bool",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "timestamp",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "nonce",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "emitterChainId",
            type: "uint16",
          },
          {
            internalType: "bytes32",
            name: "emitterAddress",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sequence",
            type: "uint64",
          },
          {
            internalType: "uint8",
            name: "consistencyLevel",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "payload",
            type: "bytes",
          },
          {
            internalType: "uint32",
            name: "guardianSetIndex",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "guardianIndex",
                type: "uint8",
              },
            ],
            internalType: "struct IWormhole.Signature[]",
            name: "signatures",
            type: "tuple[]",
          },
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
        ],
        internalType: "struct IWormhole.VM",
        name: "vm",
        type: "tuple",
      },
    ],
    name: "verifyVM",
    outputs: [
      {
        internalType: "bool",
        name: "valid",
        type: "bool",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IWormhole__factory {
  static readonly abi = _abi;
  static createInterface(): IWormholeInterface {
    return new Interface(_abi) as IWormholeInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IWormhole {
    return new Contract(address, _abi, runner) as unknown as IWormhole;
  }
}
