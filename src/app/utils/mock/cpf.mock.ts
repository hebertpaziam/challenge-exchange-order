export const CPFMock = (): string => {
  // Function to calculate the check digit
  function calculateCheckDigit(cpfBase: number[]): number {
    let sum = 0;
    let weight = cpfBase.length + 1;

    // Calculating the first check digit
    for (const digit of cpfBase) {
      sum += digit * weight--;
    }

    const remainder = sum % 11;
    if (remainder < 2) {
      return 0;
    } else {
      return 11 - remainder;
    }
  }

  // Generate the first 9 random digits for the CPF
  const cpfBase = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  // Calculate the first check digit
  const firstCheckDigit = calculateCheckDigit(cpfBase);

  // Add the first check digit
  cpfBase.push(firstCheckDigit);

  // Calculate the second check digit
  const secondCheckDigit = calculateCheckDigit(cpfBase);

  // Add the second check digit
  cpfBase.push(secondCheckDigit);

  // Format the CPF as 'xxx.xxx.xxx-xx'
  return cpfBase.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};
