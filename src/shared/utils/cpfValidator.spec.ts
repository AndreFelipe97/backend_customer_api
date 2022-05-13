import { cpfValidator } from './cpfValidator';

describe('CPF validator', () => {
  it('should cpf repeated digits', () => {
    const isValid = cpfValidator('00000000000');
    expect(isValid).toBeFalsy();
  });

  it('should cpf first digit invalid', () => {
    const isValid = cpfValidator('85314470009');
    expect(isValid).toBeFalsy();
  });

  it('should cpf second digit invalid', () => {
    const isValid = cpfValidator('85314470030');
    expect(isValid).toBeFalsy();
  });

  it('should cpf valid', () => {
    const isValid = cpfValidator('85314470039');
    expect(isValid).toBeTruthy();
  });
});
