import { MinTotalAmountValidator } from './min-total-amount.validator';

describe('MinTotalAmountValidator', () => {
  it('create an instance', () => {
    expect(MinTotalAmountValidator(100)).toBeTruthy();
  });
});
