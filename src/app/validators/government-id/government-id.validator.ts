import { AbstractControl, ValidatorFn } from '@angular/forms';

export const isCpfValid = (cpf: string): boolean => {
  if (!cpf || cpf.length !== 11) return false;
  const cpfArray = cpf.split('');
  let sum = 0;
  let remainder: number;

  // Validação do primeiro dígito
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpfArray[i]) * (10 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfArray[9])) return false;

  sum = 0;
  // Validação do segundo dígito
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpfArray[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfArray[10])) return false;

  return true;
};

export const GovernmentIdValidator = (): ValidatorFn => {
  return (control: AbstractControl): Record<string, boolean> | null => {
    const value = `${control?.value}`.replace(/\D/g, '');

    if (!value) return null;

    if (value?.length === 11 && isCpfValid(value)) {
      return null;
    }

    return { invalid: true };
  };
};
