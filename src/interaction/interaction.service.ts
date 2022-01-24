import { Injectable } from '@nestjs/common';
import { INTERACTION_TYPE } from './interaction.constant';
import { Farm } from '../farm/farm.entity';
import { Token } from '../token/token.entity';
import {
  FarmInteractionResponse,
  TokenInteractionResponse,
} from './interaction.dto';
import { IFarmInteraction, ITokenInteraction } from './interaction.interface';
import { InteractionRepository } from './interaction.repository';

@Injectable()
export class InteractionService {
  constructor(public readonly repository: InteractionRepository) {}

  async getTokenInteractions(
    address: string,
  ): Promise<TokenInteractionResponse> {
    const interactions = await this.repository
      .createQueryBuilder('interaction')
      // 이너 조인 (1) interaction.contractAddress = token.address  (2) interaction.network = token.network (3)token.status = true
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

    const tokens = [];
    const addresses = [];

    (interactions as ITokenInteraction[]).map(({ token }) => {
      tokens.push(token);
      addresses.push(token.address);
    });

    return { tokens, addresses };
  }

  async getFarmInteractions(address: string): Promise<FarmInteractionResponse> {
    const interactions = await this.repository
      .createQueryBuilder('interaction')
      .innerJoinAndMapOne(
        'interaction.farm',
        Farm,
        'farm',
        'interaction.contractAddress = farm.address AND (interaction.referPid = farm.pid or interaction.referAddress = farm.poolAddress) ',
      )
      // 팜 조인
      .leftJoinAndSelect('farm.protocol', 'protocol')
      .leftJoinAndSelect('protocol.network', 'network')
      .leftJoinAndSelect('farm.stakeTokens', 'stakeTokens')
      .leftJoinAndSelect('farm.rewardTokens', 'rewardTokens')

      // 쿼리
      .where('interaction.type = :type', { type: INTERACTION_TYPE.FARM })
      .andWhere('interaction.address = :address', { address })
      .getMany();

    const farms = (interactions as IFarmInteraction[]).map(({ farm }) => farm);
    return { farms };
  }
}
