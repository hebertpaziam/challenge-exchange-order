import { ErrorMessagePipe } from './error-message.pipe';

describe('ErrorMessagePipe', () => {
  const pipe = new ErrorMessagePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for no errors', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform({})).toBe('');
  });

  it('should return correct message for required error', () => {
    expect(pipe.transform({ required: true })).toBe('é obrigatório(a)');
  });

  it('should return correct message for email error', () => {
    expect(pipe.transform({ email: true })).toBe('está com formato inválido');
  });

  it('should return correct message for minlength error', () => {
    expect(pipe.transform({ minlength: { requiredLength: 5 } })).toBe('deve ter pelo menos 5 caracteres');
  });

  it('should return correct message for maxlength error', () => {
    expect(pipe.transform({ maxlength: { requiredLength: 10 } })).toBe('deve ter no maximo 10 caracteres');
  });

  it('should return correct message for min error', () => {
    expect(pipe.transform({ min: { min: 5 } })).toBe('deve ser maior ou igual a 5');
  });

  it('should return correct message for max error', () => {
    expect(pipe.transform({ max: { max: 10 } })).toBe('deve ser menor ou igual a 10');
  });

  it('should return correct message for pattern error', () => {
    expect(pipe.transform({ pattern: true })).toBe('está com formato inválido');
  });

  it('should return correct message for notFound error', () => {
    expect(pipe.transform({ notFound: true })).toBe('não encontrado(a)');
  });

  it('should return correct message for login error', () => {
    expect(pipe.transform({ login: true })).toBe('Usuário e/ou senha incorretos');
  });

  it('should return correct message for invalid error', () => {
    expect(pipe.transform({ invalid: true })).toBe('inválido');
  });
});