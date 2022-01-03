import { Network } from './network.entity';
import { Provider } from '@ethersproject/providers';
import { LCDClient } from '@terra-money/terra.js';

export type TAggregatorProvider = LCDClient | Provider;

export type TAggregatorProviders = Array<TAggregatorProvider>;

export interface IExtendNetworkProvider extends Network {
  providers: TAggregatorProviders;
}
