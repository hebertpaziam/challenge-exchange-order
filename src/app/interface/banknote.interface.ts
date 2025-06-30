import { BankNoteTypeEnum } from '@app/enums/banknote.enum';

export interface IBanknote {
  id: string;
  type: BankNoteTypeEnum;
  value: number;
  quantity: number;
}
