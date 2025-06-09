export type CardType = 'credit' | 'debit' | 'prepaid';

export type CardScheme = 'visa' | 'mastercard' | 'troy' | 'amex';

export interface Card {
  id: string;
  lastFourDigits: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  type: CardType;
  scheme: CardScheme;
  isDefault?: boolean;
  isActive: boolean;
  maskedNumber: string;
}