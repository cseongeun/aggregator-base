import { Injectable } from '@nestjs/common';
import { LCDClient } from '@terra-money/terra.js';
import { ethers } from 'ethers';
import { NETWORK_CHAIN_TYPE } from './network.constant';
import { Network } from './network.entity';
import {
  TAggregatorProvider,
  TAggregatorProviders,
  IExtendNetworkProvider,
} from './network.interface';
import { NetworkRepository } from './network.repository';
import { randomPick } from '@seongeun/aggregator-util/lib/array';

@Injectable()
export class NetworkService {
  public networkWithProviderByChainKey = new Map<
    string,
    IExtendNetworkProvider
  >();

  constructor(public readonly repository: NetworkRepository) {}

  async onModuleInit(): Promise<void> {
    const networks = await this.repository.find({});

    networks.forEach((network: Network) => {
      const providers = this.generateNetworkProviders(network);
      this.networkWithProviderByChainKey.set(network.chainKey, {
        ...network,
        providers,
        chainKey: network.chainKey,
      });
    });
  }

  /**
   * Get Network's Provider
   * @param chainKey chainKey
   * @returns Random Network Provider
   */
  provider(chainKey: string): TAggregatorProvider {
    return randomPick(this.providers(chainKey));
  }

  /**
   * Get Network's Providers
   * @param chainId chainId
   * @returns Network's Providers
   */
  providers(chainKey: string): TAggregatorProviders {
    return this.networkWithProviderByChainKey.get(chainKey).providers;
  }

  /**
   * Get Network's Multicall address
   * @param chainkey chainId
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
  generateNetworkProviders(network: Network): TAggregatorProviders {
    const providers: TAggregatorProviders = [];

    const { chainType, chainId, http } = network;

    switch (chainType) {
      case NETWORK_CHAIN_TYPE.EVM: {
        for (const { url } of http) {
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
          const provider = new ethers.providers.StaticJsonRpcProvider({
            url,
          });

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
