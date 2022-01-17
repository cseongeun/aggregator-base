import { Injectable } from '@nestjs/common';
import { isArray, isNull } from '@seongeun/aggregator-util/lib/type';
import { EntityManager, SelectQueryBuilder, TransactionManager } from 'typeorm';
import { TokenPriceRepository } from '../token-price/token-price.repository';
import { TokenSearchQuery } from './token.dto';
import { Token } from './token.entity';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    public readonly repository: TokenRepository,
    private readonly tokenPriceRepository: TokenPriceRepository,
  ) {}

  async updateTokenPrice(
    token: Token,
    params: { value: string; historicalValue: Record<string, any> },
    @TransactionManager() manager: EntityManager,
  ): Promise<void> {
    if (isNull(token.tokenPrice)) {
      const tokenPriceEntity = await this.tokenPriceRepository.createOneBy(
        {
          value: params.value,
          historicalValue: params.historicalValue,
        },
        manager,
      );

      await this.repository.updateOneBy(
        { id: token.id },
        { tokenPrice: tokenPriceEntity },
        manager,
      );

      return;
    }

    await this.tokenPriceRepository.updateOneBy(
      {
        id: token.tokenPrice.id,
      },
      {
        value: params.value,
        historicalValue: params.historicalValue,
      },
      manager,
    );
  }

  async search(params: TokenSearchQuery): Promise<Token[]> {
    const queryBuilder = this.repository.createQueryBuilder('token');

    this._searchQueryBuilder(queryBuilder, params);

    const result = await queryBuilder.disableEscaping().getMany();
    return result;
  }

  private _searchQueryBuilder(
    queryBuilder: SelectQueryBuilder<Token>,
    params: TokenSearchQuery,
  ): SelectQueryBuilder<Token> {
    Token.relations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(`token.${relation}`, relation);
    });

    Token.recursiveRelations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(relation, relation.replace('.', '_'));
    });

    queryBuilder.andWhere('network.status = true');
    queryBuilder.andWhere('token.status = true');

    if (params.id) {
      if (isArray(params.id)) {
        queryBuilder.andWhere('token.id in (:id)', { id: params.id });
      } else {
        queryBuilder.andWhere('token.id = :id', { id: params.id });
      }
    }

    if (params.address) {
      if (isArray(params.address)) {
        queryBuilder.andWhere('token.address in (:address)', {
          address: params.address,
        });
      } else {
        queryBuilder.andWhere('token.address = :address', {
          address: params.address,
        });
      }
    }

    if (params.type) {
      if (isArray(params.type)) {
        queryBuilder.andWhere('token.type in (:type)', {
          type: params.type,
        });
      } else {
        queryBuilder.andWhere('token.type = :type', {
          type: params.type,
        });
      }
    }

    if (params.networkId) {
      if (isArray(params.networkId)) {
        queryBuilder.andWhere('token.network.id in (:networkId)', {
          networkId: params.networkId,
        });
      } else {
        queryBuilder.andWhere('token.network.id = :networkId', {
          networkId: params.networkId,
        });
      }
    }

    if (params.oracleType) {
      if (isArray(params.oracleType)) {
        queryBuilder.andWhere('tokenPrice.oracleType in (:oracleType)', {
          oracleType: params.oracleType,
        });
      } else {
        queryBuilder.andWhere('tokenPrice.oracleType = :oracleType', {
          oracleType: params.oracleType,
        });
      }
    }

    return queryBuilder;
  }
}
