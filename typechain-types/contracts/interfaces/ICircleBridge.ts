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

export interface ICircleBridgeInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "depositForBurn"
      | "depositForBurnWithCaller"
      | "handleReceiveMessage"
      | "localMessageTransmitter"
      | "localMinter"
      | "owner"
      | "remoteCircleBridges"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "depositForBurn",
    values: [BigNumberish, BigNumberish, BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "depositForBurnWithCaller",
    values: [BigNumberish, BigNumberish, BytesLike, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "handleReceiveMessage",
    values: [BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "localMessageTransmitter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "localMinter",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "remoteCircleBridges",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositForBurn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositForBurnWithCaller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleReceiveMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "localMessageTransmitter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "localMinter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "remoteCircleBridges",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export interface ICircleBridge extends BaseContract {
  connect(runner?: ContractRunner | null): ICircleBridge;
  waitForDeployment(): Promise<this>;

  interface: ICircleBridgeInterface;

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

  depositForBurn: TypedContractMethod<
    [
      _amount: BigNumberish,
      _destinationDomain: BigNumberish,
      _mintRecipient: BytesLike,
      _burnToken: AddressLike
    ],
    [bigint],
    "nonpayable"
  >;

  depositForBurnWithCaller: TypedContractMethod<
    [
      _amount: BigNumberish,
      _destinationDomain: BigNumberish,
      _mintRecipient: BytesLike,
      _burnToken: AddressLike,
      _destinationCaller: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;

  handleReceiveMessage: TypedContractMethod<
    [_remoteDomain: BigNumberish, _sender: BytesLike, messageBody: BytesLike],
    [boolean],
    "view"
  >;

  localMessageTransmitter: TypedContractMethod<[], [string], "view">;

  localMinter: TypedContractMethod<[], [string], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  remoteCircleBridges: TypedContractMethod<
    [domain: BigNumberish],
    [string],
    "view"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "depositForBurn"
  ): TypedContractMethod<
    [
      _amount: BigNumberish,
      _destinationDomain: BigNumberish,
      _mintRecipient: BytesLike,
      _burnToken: AddressLike
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositForBurnWithCaller"
  ): TypedContractMethod<
    [
      _amount: BigNumberish,
      _destinationDomain: BigNumberish,
      _mintRecipient: BytesLike,
      _burnToken: AddressLike,
      _destinationCaller: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "handleReceiveMessage"
  ): TypedContractMethod<
    [_remoteDomain: BigNumberish, _sender: BytesLike, messageBody: BytesLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "localMessageTransmitter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "localMinter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "remoteCircleBridges"
  ): TypedContractMethod<[domain: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  filters: {};
}
