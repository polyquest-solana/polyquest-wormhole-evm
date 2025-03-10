/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace IWormhole {
  export type GuardianSetStruct = {
    keys: AddressLike[];
    expirationTime: BigNumberish;
  };

  export type GuardianSetStructOutput = [
    keys: string[],
    expirationTime: bigint
  ] & { keys: string[]; expirationTime: bigint };

  export type SignatureStruct = {
    r: BytesLike;
    s: BytesLike;
    v: BigNumberish;
    guardianIndex: BigNumberish;
  };

  export type SignatureStructOutput = [
    r: string,
    s: string,
    v: bigint,
    guardianIndex: bigint
  ] & { r: string; s: string; v: bigint; guardianIndex: bigint };

  export type VMStruct = {
    version: BigNumberish;
    timestamp: BigNumberish;
    nonce: BigNumberish;
    emitterChainId: BigNumberish;
    emitterAddress: BytesLike;
    sequence: BigNumberish;
    consistencyLevel: BigNumberish;
    payload: BytesLike;
    guardianSetIndex: BigNumberish;
    signatures: IWormhole.SignatureStruct[];
    hash: BytesLike;
  };

  export type VMStructOutput = [
    version: bigint,
    timestamp: bigint,
    nonce: bigint,
    emitterChainId: bigint,
    emitterAddress: string,
    sequence: bigint,
    consistencyLevel: bigint,
    payload: string,
    guardianSetIndex: bigint,
    signatures: IWormhole.SignatureStructOutput[],
    hash: string
  ] & {
    version: bigint;
    timestamp: bigint;
    nonce: bigint;
    emitterChainId: bigint;
    emitterAddress: string;
    sequence: bigint;
    consistencyLevel: bigint;
    payload: string;
    guardianSetIndex: bigint;
    signatures: IWormhole.SignatureStructOutput[];
    hash: string;
  };
}

export interface IWormholeInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "chainId"
      | "getCurrentGuardianSetIndex"
      | "getGuardianSet"
      | "getGuardianSetExpiry"
      | "governanceActionIsConsumed"
      | "governanceChainId"
      | "governanceContract"
      | "isInitialized"
      | "messageFee"
      | "parseAndVerifyVM"
      | "parseVM"
      | "publishMessage"
      | "verifySignatures"
      | "verifyVM"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "LogMessagePublished"): EventFragment;

  encodeFunctionData(functionFragment: "chainId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCurrentGuardianSetIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGuardianSet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getGuardianSetExpiry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governanceActionIsConsumed",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "governanceChainId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governanceContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isInitialized",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "messageFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "parseAndVerifyVM",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "parseVM", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "publishMessage",
    values: [BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "verifySignatures",
    values: [
      BytesLike,
      IWormhole.SignatureStruct[],
      IWormhole.GuardianSetStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyVM",
    values: [IWormhole.VMStruct]
  ): string;

  decodeFunctionResult(functionFragment: "chainId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentGuardianSetIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGuardianSet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGuardianSetExpiry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceActionIsConsumed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceChainId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "messageFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "parseAndVerifyVM",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "parseVM", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "publishMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifySignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verifyVM", data: BytesLike): Result;
}

export namespace LogMessagePublishedEvent {
  export type InputTuple = [
    sender: AddressLike,
    sequence: BigNumberish,
    nonce: BigNumberish,
    payload: BytesLike,
    consistencyLevel: BigNumberish
  ];
  export type OutputTuple = [
    sender: string,
    sequence: bigint,
    nonce: bigint,
    payload: string,
    consistencyLevel: bigint
  ];
  export interface OutputObject {
    sender: string;
    sequence: bigint;
    nonce: bigint;
    payload: string;
    consistencyLevel: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IWormhole extends BaseContract {
  connect(runner?: ContractRunner | null): IWormhole;
  waitForDeployment(): Promise<this>;

  interface: IWormholeInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  chainId: TypedContractMethod<[], [bigint], "view">;

  getCurrentGuardianSetIndex: TypedContractMethod<[], [bigint], "view">;

  getGuardianSet: TypedContractMethod<
    [index: BigNumberish],
    [IWormhole.GuardianSetStructOutput],
    "view"
  >;

  getGuardianSetExpiry: TypedContractMethod<[], [bigint], "view">;

  governanceActionIsConsumed: TypedContractMethod<
    [hash: BytesLike],
    [boolean],
    "view"
  >;

  governanceChainId: TypedContractMethod<[], [bigint], "view">;

  governanceContract: TypedContractMethod<[], [string], "view">;

  isInitialized: TypedContractMethod<[impl: AddressLike], [boolean], "view">;

  messageFee: TypedContractMethod<[], [bigint], "view">;

  parseAndVerifyVM: TypedContractMethod<
    [encodedVM: BytesLike],
    [
      [IWormhole.VMStructOutput, boolean, string] & {
        vm: IWormhole.VMStructOutput;
        valid: boolean;
        reason: string;
      }
    ],
    "view"
  >;

  parseVM: TypedContractMethod<
    [encodedVM: BytesLike],
    [IWormhole.VMStructOutput],
    "view"
  >;

  publishMessage: TypedContractMethod<
    [nonce: BigNumberish, payload: BytesLike, consistencyLevel: BigNumberish],
    [bigint],
    "payable"
  >;

  verifySignatures: TypedContractMethod<
    [
      hash: BytesLike,
      signatures: IWormhole.SignatureStruct[],
      guardianSet: IWormhole.GuardianSetStruct
    ],
    [[boolean, string] & { valid: boolean; reason: string }],
    "view"
  >;

  verifyVM: TypedContractMethod<
    [vm: IWormhole.VMStruct],
    [[boolean, string] & { valid: boolean; reason: string }],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "chainId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCurrentGuardianSetIndex"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getGuardianSet"
  ): TypedContractMethod<
    [index: BigNumberish],
    [IWormhole.GuardianSetStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getGuardianSetExpiry"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "governanceActionIsConsumed"
  ): TypedContractMethod<[hash: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "governanceChainId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "governanceContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "isInitialized"
  ): TypedContractMethod<[impl: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "messageFee"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "parseAndVerifyVM"
  ): TypedContractMethod<
    [encodedVM: BytesLike],
    [
      [IWormhole.VMStructOutput, boolean, string] & {
        vm: IWormhole.VMStructOutput;
        valid: boolean;
        reason: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "parseVM"
  ): TypedContractMethod<
    [encodedVM: BytesLike],
    [IWormhole.VMStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "publishMessage"
  ): TypedContractMethod<
    [nonce: BigNumberish, payload: BytesLike, consistencyLevel: BigNumberish],
    [bigint],
    "payable"
  >;
  getFunction(
    nameOrSignature: "verifySignatures"
  ): TypedContractMethod<
    [
      hash: BytesLike,
      signatures: IWormhole.SignatureStruct[],
      guardianSet: IWormhole.GuardianSetStruct
    ],
    [[boolean, string] & { valid: boolean; reason: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "verifyVM"
  ): TypedContractMethod<
    [vm: IWormhole.VMStruct],
    [[boolean, string] & { valid: boolean; reason: string }],
    "view"
  >;

  getEvent(
    key: "LogMessagePublished"
  ): TypedContractEvent<
    LogMessagePublishedEvent.InputTuple,
    LogMessagePublishedEvent.OutputTuple,
    LogMessagePublishedEvent.OutputObject
  >;

  filters: {
    "LogMessagePublished(address,uint64,uint32,bytes,uint8)": TypedContractEvent<
      LogMessagePublishedEvent.InputTuple,
      LogMessagePublishedEvent.OutputTuple,
      LogMessagePublishedEvent.OutputObject
    >;
    LogMessagePublished: TypedContractEvent<
      LogMessagePublishedEvent.InputTuple,
      LogMessagePublishedEvent.OutputTuple,
      LogMessagePublishedEvent.OutputObject
    >;
  };
}
