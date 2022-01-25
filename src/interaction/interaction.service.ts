import { Injectable } from '@nestjs/common';
import { INTERACTION_TYPE } from './interaction.constant';
import { Farm } from '../farm/farm.entity';
import { Token } from '../token/token.entity';
import { IFarmInteraction, ITokenInteraction } from './interaction.interface';
import { InteractionRepository } from './interaction.repository';

@Injectable()
export class InteractionService {
  constructor(public readonly repository: InteractionRepository) {}

  async getTokenInteractions(address: string): Promise<Token[]> {
    const interactions = await this.repository
      .createQueryBuilder('interaction')
      /**
       * 이너 조인
       * (1) interaction.contractAddress = token.address
       * (2) interaction.network = token.network
       * (3)token.status = true
       **/
      .innerJoinAndMapOne(
        'interaction.token',
        Token,
        'token',
        'interaction.contractAddress = token.address AND interaction.network = token.network AND token.status = true',
      )
      // 토큰 조인
      .leftJoinAndSelect('token.network', 'network', 'network.status = true')
      .leftJoinAndSelect('token.tokenPrice', 'tokenPrice')

      .leftJoinAndSelect('token.pair0', 'pair0')
      .leftJoinAndSelect('token.pair1', 'pair1')
      .leftJoinAndSelect('token.wrapped', 'wrapped')

      // 쿼리
      .where('interaction.type = :type', { type: INTERACTION_TYPE.TOKEN })
      .andWhere('interaction.address = :address', { address })
      .getMany();

    return (interactions as ITokenInteraction[]).map(({ token }) => token);
  }

  async getFarmInteractions(address: string): Promise<Farm[]> {
    const interactions = await this.repository
      .createQueryBuilder('interaction')
      /**
       * 이너 조인
       * (1) interaction.contractAddress = farm.address
       * (2) interaction.referPid = farm.pid   OR   interaction.referAddress = farm.poolAddress
       * (3) farm.status = true
       */
      .innerJoinAndMapOne(
        'interaction.farm',
        Farm,
        'farm',
        'interaction.contractAddress = farm.address AND (interaction.referPid = farm.pid OR interaction.referAddress = farm.poolAddress) AND farm.status = true',
      )
      // 팜 조인
      .leftJoinAndSelect('farm.protocol', 'protocol')
      .leftJoinAndSelect('protocol.network', 'network')

      .leftJoinAndSelect('farm.stakeTokens', 'stakeTokens')
      .leftJoinAndSelect('stakeTokens.tokenPrice', 'stakeTokens.tokenPrice')

      .leftJoinAndSelect('farm.rewardTokens', 'rewardTokens')
      .leftJoinAndSelect('rewardTokens.tokenPrice', 'rewardTokens.tokenPrice')

      // 쿼리
      .where('interaction.type = :type', { type: INTERACTION_TYPE.FARM })
      .andWhere('interaction.address = :address', { address })
      .getMany();

    return (interactions as IFarmInteraction[]).map(({ farm }) => farm);
  }
}
