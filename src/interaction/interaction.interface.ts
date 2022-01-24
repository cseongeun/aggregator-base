import { Interaction } from './interaction.entity';
import { Token } from '../token/token.entity';
import { Farm } from '../farm/farm.entity';

export interface ITokenInteraction extends Interaction {
  token: Token;
}

export interface IFarmInteraction extends Interaction {
  farm: Farm;
}
