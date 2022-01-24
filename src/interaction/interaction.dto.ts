import { Token } from '../token/token.entity';
import { Farm } from '../farm/farm.entity';
import { Lending } from '../lending/lending.entity';

export class TokenInteractionResponse {
  tokens: Token[];
}

export class FarmInteractionResponse {
  farms: Farm[];
}

export class LendingInteractionResponse {
  lendings: Lending[];
}
