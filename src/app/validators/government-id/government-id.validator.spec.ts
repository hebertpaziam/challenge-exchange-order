import { FormControl } from '@angular/forms';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { CPFMock } from '@app/utils/mock/cpf.mock';

import { GovernmentIdValidator } from './government-id.validator';

describe('GovernmentIdValidator', () => {
  it('create an instance', () => {
    expect(GovernmentIdValidator()).toBeTruthy();
  });

  it('should be invalid with any string value', () => {
    const control = new FormControl(faker.lorem.word() + '123');

    const result = GovernmentIdValidator()(control);

    expect(result).toStrictEqual({ invalid: true });
  });

  it('should be invalid with CPF value', () => {
    const control = new FormControl(faker.number.int({ min: 10000000000, max: 99999999999 }));

    const result = GovernmentIdValidator()(control);

    expect(result).toStrictEqual({ invalid: true });
  });

  it('should be valid with empty value', () => {
    const control = new FormControl('');

    const result = GovernmentIdValidator()(control);

    expect(result).toBeNull();
  });

  it('should be valid with null value', () => {
    const control = new FormControl(null);

    const result = GovernmentIdValidator()(control);

    expect(result).toBeNull();
  });

  it('should be valid with CPF value', () => {
    const control = new FormControl(CPFMock());

    const result = GovernmentIdValidator()(control);

    expect(result).toBeNull();
  });
});
