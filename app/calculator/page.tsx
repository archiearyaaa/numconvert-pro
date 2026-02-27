"use client"

import { useMemo, useState } from "react"

function calculate(a: number, b: number, op: string): number {
  switch (op) {
    case "+":
      return a + b
    case "-":
      return a - b
    case "*":
      return a * b
    case "/":
      if (b === 0) throw new Error("Tidak bisa dibagi 0")
      return Math.floor(a / b) // pembagian bilangan bulat
    default:
      throw new Error("Operator tidak valid")
  }
}

function isValidInput(val: string, base: string) {
  if (!val) return false
  const clean = val.startsWith("-") ? val.slice(1) : val

  switch (base) {
    case "2":
      return /^[01]+$/.test(clean)
    case "8":
      return /^[0-7]+$/.test(clean)
    case "10":
      return /^[0-9]+$/.test(clean)
    case "16":
      return /^[0-9a-fA-F]+$/.test(clean)
    default:
      return false
  }
}

export default function CalculatorPage() {
  const [num1, setNum1] = useState("")
  const [num2, setNum2] = useState("")
  const [operator, setOperator] = useState("+")
  const [base, setBase] = useState("2")

  const result = useMemo(() => {
    if (!num1 || !num2) return null

    if (!isValidInput(num1, base) || !isValidInput(num2, base)) {
      return "Input tidak valid sesuai basis yang dipilih"
    }

    try {
      const dec1 = parseInt(num1, parseInt(base))
      const dec2 = parseInt(num2, parseInt(base))

      const calc = calculate(dec1, dec2, operator)

      return {
        binary: calc.toString(2),
        octal: calc.toString(8),
        decimal: calc.toString(10),
        hex: calc.toString(16).toUpperCase(),
      }
    } catch (err: any) {
      return err.message
    }
  }, [num1, num2, operator, base])

  return (
    <div className="max-w-4xl mx-auto py-16 space-y-16">

      {/* ================= KALKULATOR ================= */}
      <section className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Kalkulator Multi Basis (Real-Time)
        </h1>

        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/20 border border-white/20"
        >
          <option value="2">Biner (Basis 2)</option>
          <option value="8">Oktal (Basis 8)</option>
          <option value="10">Desimal (Basis 10)</option>
          <option value="16">Hexadecimal (Basis 16)</option>
        </select>

        <input
          type="text"
          placeholder="Angka Pertama"
          value={num1}
          onChange={(e) => setNum1(e.target.value.trim())}
          className="w-full p-4 rounded-xl bg-white/20 border border-white/20"
        />

        <div className="flex gap-4">
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="p-4 rounded-xl bg-white/20 border border-white/20"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>

          <input
            type="text"
            placeholder="Angka Kedua"
            value={num2}
            onChange={(e) => setNum2(e.target.value.trim())}
            className="flex-1 p-4 rounded-xl bg-white/20 border border-white/20"
          />
        </div>
      </section>

      {/* ================= HASIL ================= */}
      <section className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-4">
        <h2 className="text-2xl font-semibold text-center">
          Hasil dalam Semua Basis
        </h2>

        {typeof result === "string" ? (
          <p className="text-center text-red-400 font-semibold">
            {result}
          </p>
        ) : result ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard label="Biner" value={result.binary} />
            <ResultCard label="Oktal" value={result.octal} />
            <ResultCard label="Desimal" value={result.decimal} />
            <ResultCard label="Hexadecimal" value={result.hex} />
          </div>
        ) : (
          <p className="text-center text-white/50">
            Masukkan angka untuk melihat hasil
          </p>
        )}
      </section>

      {/* ================= CARA PENGGUNAAN ================= */}
      <section className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-4">
        <h2 className="text-2xl font-semibold">
          📌 Cara Menggunakan Kalkulator
        </h2>

        <ol className="list-decimal list-inside space-y-2 text-white/80">
          <li>Pilih basis bilangan terlebih dahulu.</li>
          <li>Masukkan dua angka sesuai basis yang dipilih.</li>
          <li>Pilih operator matematika (+, −, ×, ÷).</li>
          <li>Hasil akan dihitung otomatis tanpa menekan tombol.</li>
          <li>Hasil ditampilkan dalam Biner, Oktal, Desimal, dan Hexadecimal.</li>
        </ol>
      </section>

      {/* ================= INFORMASI EDUKATIF ================= */}
      <section className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-6">
        <h2 className="text-2xl font-semibold">
          📘 Informasi Edukatif
        </h2>

        <div className="space-y-4 text-white/80 leading-relaxed">

          <div>
            <h3 className="font-semibold text-white">
              🔢 Cara Kerja Kalkulator Ini
            </h3>
            <p>
              Sistem akan mengubah angka dari basis yang dipilih ke desimal terlebih dahulu.
              Setelah operasi dilakukan dalam bentuk desimal, hasilnya akan dikonversi
              kembali ke semua sistem bilangan.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              🧠 Mengapa Pembagian Dibulatkan?
            </h3>
            <p>
              Pada operasi pembagian, hasil dibulatkan ke bawah menggunakan
              <strong> Math.floor()</strong> agar sesuai dengan konsep
              pembagian bilangan bulat dalam sistem biner dan sistem basis lainnya.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              💡 Tentang Sistem Bilangan
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Biner</strong> menggunakan angka 0 dan 1</li>
              <li><strong>Oktal</strong> menggunakan angka 0–7</li>
              <li><strong>Desimal</strong> menggunakan angka 0–9</li>
              <li><strong>Hexadecimal</strong> menggunakan angka 0–9 dan huruf A–F</li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  )
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-indigo-500/20 p-6 rounded-2xl text-center">
      <p className="text-sm text-white/70">{label}</p>
      <p className="text-xl font-bold break-all">{value}</p>
    </div>
  )
}