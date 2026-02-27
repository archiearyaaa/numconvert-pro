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
// CORE CONVERSION
// ===============================

export function convertToAll(value: string, base: number) {
  let decimal: number | null = null

  switch (base) {
    case 2:
      if (!isValidBinary(value)) return null
      decimal = parseInt(value, 2)
      break

    case 8:
      if (!isValidOctal(value)) return null
      decimal = parseInt(value, 8)
      break

    case 10:
      if (!isValidDecimal(value)) return null
      decimal = parseInt(value, 10)
      break

    case 16:
      if (!isValidHex(value)) return null
      decimal = parseInt(value, 16)
      break

    default:
      return null
  }

  return {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    decimal: decimal.toString(10),
    hex: decimal.toString(16).toUpperCase(),
  }
}