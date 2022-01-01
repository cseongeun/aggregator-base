import { Network } from './network.entity';
import { Provider } from '@ethersproject/providers';
import { LCDClient } from '@terra-money/terra.js';

export type AggregatorProvider = LCDClient | Provider;

export type AggregatorProviders = Array<AggregatorProvider>;

export interface ExtendNetworkProvider extends Network {
  providers: AggregatorProviders;
}
