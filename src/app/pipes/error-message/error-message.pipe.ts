import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true,
  pure: true,
})
export class ErrorMessagePipe implements PipeTransform {
  private readonly errorsMap: Record<string, (params?: any) => string> = {
    email: () => 'está com formato inválido',
    hasLetters: () => 'deve conter pelo menos uma letra',
    hasNumbers: () => 'deve conter pelo menos um número',
    hasSpecialCharacters: () => 'deve conter pelo menos um caractere especial',
    isEquals: (params) => {
      if (params.field1?.label && params.field2?.label) {
        return `${params.field1.label} deve ser igual a ${params.field2.label}`;
      }

      if (!params.field1?.label && params.field2?.label) {
        return `deve ser igual a ${params.field2.label}`;
      }

      if (params.field1?.label && !params.field2?.label) {
        return `deve ser igual a ${params.field1.label}`;
      }

      return 'devem ser iguais';
    },
    isOnlyLetters: () => 'deve conter apenas letras',
    isOnlyNumbers: () => 'deve conter apenas números',
    isOnlySpecialCharacters: () => 'deve conter apenas caracteres especiais',
    max: (params) => `deve ser menor ou igual a ${params.max}`,
    maxlength: (params) => `deve ter no maximo ${params.requiredLength} caracteres`,
    min: (params) => `deve ser maior ou igual a ${params.min}`,
    minlength: (params) => `deve ter pelo menos ${params.requiredLength} caracteres`,
    notEqual: (params) => `deve ser diferente de ${params.value}`,
    pattern: () => 'está com formato inválido',
    notFound: () => 'não encontrado(a)',
    required: () => 'é obrigatório(a)',
    login: () => 'Usuário e/ou senha incorretos',
    invalid: () => 'inválido',
  };

  transform(validationErrors: ValidationErrors | null | undefined): string {
    const [key, value] = Object.entries(validationErrors || {})[0] || [];
    if (!key) return '';
    return this.errorsMap[key]?.(value) || '';
  }
}
