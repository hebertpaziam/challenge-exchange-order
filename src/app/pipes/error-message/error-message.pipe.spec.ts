import { ErrorMessagePipe } from './error-message.pipe';

describe('ErrorMessagePipe', () => {
  const pipe = new ErrorMessagePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the correct error message for each error type', () => {
    expect(pipe.transform({ email: true })).toBe('está com formato inválido');
    expect(pipe.transform({ hasLetters: true })).toBe('deve conter pelo menos uma letra');
    expect(pipe.transform({ hasNumbers: true })).toBe('deve conter pelo menos um número');
    expect(pipe.transform({ hasSpecialCharacters: true })).toBe('deve conter pelo menos um caractere especial');
    expect(pipe.transform({ isOnlyLetters: true })).toBe('deve conter apenas letras');
    expect(pipe.transform({ isOnlyNumbers: true })).toBe('deve conter apenas números');
    expect(pipe.transform({ isOnlySpecialCharacters: true })).toBe('deve conter apenas caracteres especiais');
    expect(pipe.transform({ max: { max: 10 } })).toBe('deve ser menor ou igual a 10');
    expect(pipe.transform({ maxlength: { requiredLength: 5 } })).toBe('deve ter no maximo 5 caracteres');
    expect(pipe.transform({ min: { min: 5 } })).toBe('deve ser maior ou igual a 5');
    expect(pipe.transform({ minlength: { requiredLength: 10 } })).toBe('deve ter pelo menos 10 caracteres');
    expect(pipe.transform({ notEqual: { value: 'test' } })).toBe('deve ser diferente de test');
    expect(pipe.transform({ pattern: true })).toBe('está com formato inválido');
    expect(pipe.transform({ notFound: true })).toBe('não encontrado(a)');
    expect(pipe.transform({ required: true })).toBe('é obrigatório(a)');
    expect(pipe.transform({ login: true })).toBe('Usuário e/ou senha incorretos');
    expect(pipe.transform({ invalid: true })).toBe('inválido');
  });

  describe('isEquals error', () => {
    it('should return the correct message when both field labels are provided', () => {
      const error = { isEquals: { field1: { label: 'Senha' }, field2: { label: 'Confirmar Senha' } } };
      expect(pipe.transform(error)).toBe('Senha deve ser igual a Confirmar Senha');
    });

    it('should return the correct message when only the second field label is provided', () => {
      const error = { isEquals: { field2: { label: 'Confirmar Senha' } } };
      expect(pipe.transform(error)).toBe('deve ser igual a Confirmar Senha');
    });

    it('should return the correct message when only the first field label is provided', () => {
      const error = { isEquals: { field1: { label: 'Senha' } } };
      expect(pipe.transform(error)).toBe('deve ser igual a Senha');
    });

    it('should return the default message when no field labels are provided', () => {
      const error = { isEquals: {} };
      expect(pipe.transform(error)).toBe('devem ser iguais');
    });
  });

  it('should return an empty string for null or undefined errors', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return an empty string for an unknown error type', () => {
    expect(pipe.transform({ unknownError: true })).toBe('');
  });
});
