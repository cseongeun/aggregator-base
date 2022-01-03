import { Injectable } from '@nestjs/common';
import { LCDClient } from '@terra-money/terra.js';
import { ethers } from 'ethers';
import { NETWORK_CHAIN_TYPE } from './network.constant';
import { Network } from './network.entity';
import {
  AggregatorProvider,
  AggregatorProviders,
  ExtendNetworkProvider,
} from './network.interface';
import { NetworkRepository } from './network.repository';
import { randomPick } from '@seongeun/aggregator-util/lib/array';

@Injectable()
export class NetworkService {
  public networkWithProviderByChainKey = new Map<
    string,
    ExtendNetworkProvider
  >();

  constructor(public readonly repository: NetworkRepository) {}

  async onModuleInit(): Promise<void> {
    const networks = await this.repository.find({});

    networks.forEach((network: Network) => {
      const providers = this.generateNetworkProviders(network);
      this.networkWithProviderByChainKey.set(network.chainKey(), {
        ...network,
        providers,
      });
    });
  }

  /**
   * Get Network's Provider
   * @param chainKey chainKey
   * @returns Random Network Provider
   */
  provider(chainKey: string): AggregatorProvider {
    return randomPick(this.providers(chainKey));
  }

  /**
   * Get Network's Providers
   * @param chainId chainId
   * @returns Network's Providers
   */
  providers(chainKey: string): AggregatorProviders {
    return this.networkWithProviderByChainKey.get(chainKey).providers;
  }

  /**
   * Get Network's Multicall address
   * @param chainId chainId
   * @returns Network Multicall Address
   */
  multiCallAddress(chainKey: string): string {
    return this.networkWithProviderByChainKey.get(chainKey).multiCallAddress;
  }

  /**
   * Generate Network's Providers
   * @param network Network Entity
   * @returns Network providers
   */
  generateNetworkProviders(network: Network): AggregatorProviders {
    const providers: AggregatorProviders = [];

    const { chainType, chainId } = network;

    const http = JSON.parse(JSON.parse(JSON.stringify(network.http)));

    switch (chainType) {
      case NETWORK_CHAIN_TYPE.EVM: {
        for (const { type, url } of http) {
          // let provider: Provider;
          // if (type === 'OCTET') {
          //   provider = new ethers.providers.JsonRpcProvider({
          //     url,
          //     headers: {
          //       Authorization: `Bearer ${config.octetToken}`,
          //     },
          //   });
          // } else {
          //   provider = new ethers.providers.JsonRpcProvider({ url });
          // }
          const provider = new ethers.providers.JsonRpcProvider({ url });

          providers.push(provider);
        }
        break;
      }

      case NETWORK_CHAIN_TYPE.TERRA: {
        for (const { url } of http) {
          const provider = new LCDClient({
            URL: url,
            chainID: chainId,
          });

          providers.push(provider);
        }

        break;
      }
    }

    return providers;
  }
}
