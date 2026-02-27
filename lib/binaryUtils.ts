// Konversi ke 8-bit
export function to8Bit(binary: string) {
  return binary.padStart(8, "0").slice(-8)
}

// 2's Complement 8-bit
export function twosComplement8(binary: string) {
  let inverted = binary
    .split("")
    .map(b => (b === "0" ? "1" : "0"))
    .join("")

  let decimal = parseInt(inverted, 2) + 1

  return decimal.toString(2).padStart(8, "0")
}