// ===============================
// VALIDATION FUNCTIONS
// ===============================

export function isValidBinary(value: string): boolean {
  return /^[01]+$/.test(value)
}

export function isValidOctal(value: string): boolean {
  return /^[0-7]+$/.test(value)
}

export function isValidDecimal(value: string): boolean {
  return /^[0-9]+$/.test(value)
}

export function isValidHex(value: string): boolean {
  return /^[0-9a-fA-F]+$/.test(value)
}

// ===============================
// CONVERSION FUNCTIONS
// ===============================

export function binaryToDecimal(value: string): number | null {
  if (!isValidBinary(value)) return null
  return parseInt(value, 2)
}

export function octalToDecimal(value: string): number | null {
  if (!isValidOctal(value)) return null
  return parseInt(value, 8)
}

export function decimalToBinary(value: string): string | null {
  if (!isValidDecimal(value)) return null
  return parseInt(value, 10).toString(2)
}

export function decimalToOctal(value: string): string | null {
  if (!isValidDecimal(value)) return null
  return parseInt(value, 10).toString(8)
}

export function decimalToHex(value: string): string | null {
  if (!isValidDecimal(value)) return null
  return parseInt(value, 10).toString(16).toUpperCase()
}

export function hexToDecimal(value: string): number | null {
  if (!isValidHex(value)) return null
  return parseInt(value, 16)
}