import { JsonFragment } from '@ethersproject/abi';
import { Fragment } from 'ethers/lib/utils';

export type TContractAbi =
  | string
  | ReadonlyArray<Fragment | JsonFragment | string>;

export interface IContractInfo {
  address: string;
  abi: TContractAbi;
}
