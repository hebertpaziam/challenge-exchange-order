import { CurrencySymbolPipe } from './currency-symbol.pipe';

describe('CurrencySymbolPipe', () => {
  const pipe = new CurrencySymbolPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return R$ for BRL', () => {
    expect(pipe.transform('BRL')).toBe('R$');
  });

  it('should return US$ for USD', () => {
    expect(pipe.transform('USD')).toBe('US$');
  });

  it('should return € for EUR', () => {
    expect(pipe.transform('EUR')).toBe('€');
  });

  it('should return empty string for invalid currency code', () => {
    expect(pipe.transform('INVALID')).toBe('');
  });
});
