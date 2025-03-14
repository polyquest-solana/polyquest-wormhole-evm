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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace ICircleIntegration {
  export type DepositWithPayloadStruct = {
    token: BytesLike;
    amount: BigNumberish;
    sourceDomain: BigNumberish;
    targetDomain: BigNumberish;
    nonce: BigNumberish;
    fromAddress: BytesLike;
    mintRecipient: BytesLike;
    payload: BytesLike;
  };

  export type DepositWithPayloadStructOutput = [
    token: string,
    amount: bigint,
    sourceDomain: bigint,
    targetDomain: bigint,
    nonce: bigint,
    fromAddress: string,
    mintRecipient: string,
    payload: string
  ] & {
    token: string;
    amount: bigint;
    sourceDomain: bigint;
    targetDomain: bigint;
    nonce: bigint;
    fromAddress: string;
    mintRecipient: string;
    payload: string;
  };

  export type RedeemParametersStruct = {
    encodedWormholeMessage: BytesLike;
    circleBridgeMessage: BytesLike;
    circleAttestation: BytesLike;
  };

  export type RedeemParametersStructOutput = [
    encodedWormholeMessage: string,
    circleBridgeMessage: string,
    circleAttestation: string
  ] & {
    encodedWormholeMessage: string;
    circleBridgeMessage: string;
    circleAttestation: string;
  };

  export type TransferParametersStruct = {
    token: AddressLike;
    amount: BigNumberish;
    targetChain: BigNumberish;
    mintRecipient: BytesLike;
  };

  export type TransferParametersStructOutput = [
    token: string,
    amount: bigint,
    targetChain: bigint,
    mintRecipient: string
  ] & {
    token: string;
    amount: bigint;
    targetChain: bigint;
    mintRecipient: string;
  };
}

export interface ICircleIntegrationInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "chainId"
      | "circleBridge"
      | "circleTransmitter"
      | "decodeDepositWithPayload"
      | "encodeDepositWithPayload"
      | "evmChain"
      | "fetchLocalTokenAddress"
      | "getChainIdFromDomain"
      | "getDomainFromChainId"
      | "getRegisteredEmitter"
      | "isAcceptedToken"
      | "isInitialized"
      | "isMessageConsumed"
      | "localDomain"
      | "redeemTokensWithPayload"
      | "registerEmitterAndDomain"
      | "transferTokensWithPayload"
      | "updateWormholeFinality"
      | "upgradeContract"
      | "verifyGovernanceMessage"
      | "wormhole"
      | "wormholeFinality"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "chainId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "circleBridge",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "circleTransmitter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decodeDepositWithPayload",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeDepositWithPayload",
    values: [ICircleIntegration.DepositWithPayloadStruct]
  ): string;
  encodeFunctionData(functionFragment: "evmChain", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "fetchLocalTokenAddress",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getChainIdFromDomain",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDomainFromChainId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRegisteredEmitter",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isAcceptedToken",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isInitialized",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isMessageConsumed",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "localDomain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "redeemTokensWithPayload",
    values: [ICircleIntegration.RedeemParametersStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "registerEmitterAndDomain",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferTokensWithPayload",
    values: [
      ICircleIntegration.TransferParametersStruct,
      BigNumberish,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateWormholeFinality",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeContract",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyGovernanceMessage",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "wormhole", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "wormholeFinality",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "chainId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "circleBridge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "circleTransmitter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeDepositWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeDepositWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "evmChain", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fetchLocalTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getChainIdFromDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDomainFromChainId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRegisteredEmitter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAcceptedToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isMessageConsumed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "localDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemTokensWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerEmitterAndDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferTokensWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateWormholeFinality",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyGovernanceMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wormhole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "wormholeFinality",
    data: BytesLike
  ): Result;
}

export interface ICircleIntegration extends BaseContract {
  connect(runner?: ContractRunner | null): ICircleIntegration;
  waitForDeployment(): Promise<this>;

  interface: ICircleIntegrationInterface;

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

  circleBridge: TypedContractMethod<[], [string], "view">;

  circleTransmitter: TypedContractMethod<[], [string], "view">;

  decodeDepositWithPayload: TypedContractMethod<
    [encoded: BytesLike],
    [ICircleIntegration.DepositWithPayloadStructOutput],
    "view"
  >;

  encodeDepositWithPayload: TypedContractMethod<
    [message: ICircleIntegration.DepositWithPayloadStruct],
    [string],
    "view"
  >;

  evmChain: TypedContractMethod<[], [bigint], "view">;

  fetchLocalTokenAddress: TypedContractMethod<
    [sourceDomain: BigNumberish, sourceToken: BytesLike],
    [string],
    "view"
  >;

  getChainIdFromDomain: TypedContractMethod<
    [domain: BigNumberish],
    [bigint],
    "view"
  >;

  getDomainFromChainId: TypedContractMethod<
    [chainId_: BigNumberish],
    [bigint],
    "view"
  >;

  getRegisteredEmitter: TypedContractMethod<
    [emitterChainId: BigNumberish],
    [string],
    "view"
  >;

  isAcceptedToken: TypedContractMethod<[token: AddressLike], [boolean], "view">;

  isInitialized: TypedContractMethod<[impl: AddressLike], [boolean], "view">;

  isMessageConsumed: TypedContractMethod<[hash: BytesLike], [boolean], "view">;

  localDomain: TypedContractMethod<[], [bigint], "view">;

  redeemTokensWithPayload: TypedContractMethod<
    [params: ICircleIntegration.RedeemParametersStruct],
    [ICircleIntegration.DepositWithPayloadStructOutput],
    "nonpayable"
  >;

  registerEmitterAndDomain: TypedContractMethod<
    [encodedMessage: BytesLike],
    [void],
    "nonpayable"
  >;

  transferTokensWithPayload: TypedContractMethod<
    [
      transferParams: ICircleIntegration.TransferParametersStruct,
      batchId: BigNumberish,
      payload: BytesLike
    ],
    [bigint],
    "payable"
  >;

  updateWormholeFinality: TypedContractMethod<
    [encodedMessage: BytesLike],
    [void],
    "nonpayable"
  >;

  upgradeContract: TypedContractMethod<
    [encodedMessage: BytesLike],
    [void],
    "nonpayable"
  >;

  verifyGovernanceMessage: TypedContractMethod<
    [encodedMessage: BytesLike, action: BigNumberish],
    [[string, string] & { messageHash: string; payload: string }],
    "view"
  >;

  wormhole: TypedContractMethod<[], [string], "view">;

  wormholeFinality: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "chainId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "circleBridge"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "circleTransmitter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "decodeDepositWithPayload"
  ): TypedContractMethod<
    [encoded: BytesLike],
    [ICircleIntegration.DepositWithPayloadStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "encodeDepositWithPayload"
  ): TypedContractMethod<
    [message: ICircleIntegration.DepositWithPayloadStruct],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "evmChain"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "fetchLocalTokenAddress"
  ): TypedContractMethod<
    [sourceDomain: BigNumberish, sourceToken: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getChainIdFromDomain"
  ): TypedContractMethod<[domain: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getDomainFromChainId"
  ): TypedContractMethod<[chainId_: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getRegisteredEmitter"
  ): TypedContractMethod<[emitterChainId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "isAcceptedToken"
  ): TypedContractMethod<[token: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isInitialized"
  ): TypedContractMethod<[impl: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isMessageConsumed"
  ): TypedContractMethod<[hash: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "localDomain"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "redeemTokensWithPayload"
  ): TypedContractMethod<
    [params: ICircleIntegration.RedeemParametersStruct],
    [ICircleIntegration.DepositWithPayloadStructOutput],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "registerEmitterAndDomain"
  ): TypedContractMethod<[encodedMessage: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferTokensWithPayload"
  ): TypedContractMethod<
    [
      transferParams: ICircleIntegration.TransferParametersStruct,
      batchId: BigNumberish,
      payload: BytesLike
    ],
    [bigint],
    "payable"
  >;
  getFunction(
    nameOrSignature: "updateWormholeFinality"
  ): TypedContractMethod<[encodedMessage: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "upgradeContract"
  ): TypedContractMethod<[encodedMessage: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "verifyGovernanceMessage"
  ): TypedContractMethod<
    [encodedMessage: BytesLike, action: BigNumberish],
    [[string, string] & { messageHash: string; payload: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "wormhole"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "wormholeFinality"
  ): TypedContractMethod<[], [bigint], "view">;

  filters: {};
}
