import { AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MinTotalAmountValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const exchangeItems = control.get('exchangeItems') as FormArray<FormControl>;

    if (!exchangeItems || typeof exchangeItems !== 'object') return null;

    let total = 0;

    Object.values(exchangeItems.controls).forEach((arr: any) => {
      if (Array.isArray(arr.value)) {
        arr.value.forEach((item: any) => {
          const face = +item.face || 0;
          const quantity = +item.quantity || 0;
          total += face * quantity;
        });
      }
    });

    return total >= min ? null : { minTotalAmount: { required: min, actual: total } };
  };
}
