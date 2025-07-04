import { IExchangeItem } from './exchange-item.interface';

export interface IOrder {
  name: string;
  email: string;
  governmentId: string;
  phone: string;
  exchangeItems: Record<string, IExchangeItem[]>;
}
