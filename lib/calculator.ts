export function calculate(a: number, b: number, op: string): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error("Input harus berupa angka valid")
  }

  switch (op) {
    case "+":
      return a + b

    case "-":
      return a - b

    case "*":
      return a * b

    case "/":
      if (b === 0) {
        throw new Error("Tidak bisa dibagi 0")
      }
      return a / b

    default:
      throw new Error("Operator tidak valid")
  }
}