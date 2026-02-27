"use client"

import { useMemo, useState } from "react"

export default function ConvertPage() {
  const [value, setValue] = useState("")
  const [base, setBase] = useState("10")

  const isValidInput = (val: string, base: string) => {
    if (!val) return false

    const cleanValue = val.startsWith("-") ? val.slice(1) : val

    switch (base) {
      case "2":
        return /^[01]+$/.test(cleanValue)
      case "8":
        return /^[0-7]+$/.test(cleanValue)
      case "10":
        return /^[0-9]+$/.test(cleanValue)
      case "16":
        return /^[0-9a-fA-F]+$/.test(cleanValue)
      default:
        return false
    }
  }

  const result = useMemo(() => {
    if (!value) return null
    if (!isValidInput(value, base)) return "Invalid Input"

    const decimalValue = parseInt(value, parseInt(base))

    return {
      bin: decimalValue.toString(2),
      oct: decimalValue.toString(8),
      dec: decimalValue.toString(10),
      hex: decimalValue.toString(16).toUpperCase(),
    }
  }, [value, base])

  return (
    <div className="max-w-4xl mx-auto py-16 space-y-16">

      {/* ================= CARD KONVERSI ================= */}
      <section className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Konversi Sistem Bilangan
        </h1>

        <input
          type="text"
          placeholder="Masukkan angka..."
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
          className="w-full p-4 rounded-xl bg-white/20 border border-white/20 focus:outline-none"
        />

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

        {result && typeof result !== "string" && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <ResultCard label="Biner" value={result.bin} />
            <ResultCard label="Oktal" value={result.oct} />
            <ResultCard label="Desimal" value={result.dec} />
            <ResultCard label="Hexadecimal" value={result.hex} />
          </div>
        )}

        {result === "Invalid Input" && (
          <div className="text-red-400 text-center font-semibold">
            Input tidak valid untuk basis yang dipilih.
          </div>
        )}
      </section>

      {/* ================= CARA PENGGUNAAN ================= */}
      <section className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-4">
        <h2 className="text-2xl font-semibold">
          📌 Cara Menggunakan Fitur Konversi
        </h2>

        <ol className="list-decimal list-inside space-y-2 text-white/80">
          <li>Masukkan angka pada kolom input.</li>
          <li>Pilih basis asal bilangan (Biner, Oktal, Desimal, atau Hex).</li>
          <li>Sistem akan memvalidasi input sesuai basis.</li>
          <li>Jika valid, hasil konversi otomatis muncul.</li>
          <li>Jika tidak valid, akan muncul pesan error.</li>
        </ol>
      </section>

      {/* ================= TABEL REFERENSI ================= */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Tabel Referensi 0–15
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-white/20 text-center">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3 border border-white/20">Desimal</th>
                <th className="p-3 border border-white/20">Biner</th>
                <th className="p-3 border border-white/20">Oktal</th>
                <th className="p-3 border border-white/20">Hex</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 16 }).map((_, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="p-2 border border-white/10">{i}</td>
                  <td className="p-2 border border-white/10">{i.toString(2)}</td>
                  <td className="p-2 border border-white/10">{i.toString(8)}</td>
                  <td className="p-2 border border-white/10">
                    {i.toString(16).toUpperCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= PENJELASAN ================= */}
      <section className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-6">
        <h2 className="text-2xl font-semibold">
          📘 Penjelasan Sistem Bilangan
        </h2>

        <div className="space-y-4 text-white/80 leading-relaxed">

          <div>
            <h3 className="font-semibold text-white">Biner (Basis 2)</h3>
            <p>Menggunakan angka 0 dan 1.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Oktal (Basis 8)</h3>
            <p>Menggunakan angka 0–7.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Desimal (Basis 10)</h3>
            <p>Menggunakan angka 0–9.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Hexadecimal (Basis 16)</h3>
            <p>Menggunakan angka 0–9 dan huruf A–F.</p>
          </div>

        </div>
      </section>

    </div>
  )
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/20 p-4 rounded-xl text-center">
      <p className="text-sm text-white/70">{label}</p>
      <p className="text-lg font-bold break-all">{value}</p>
    </div>
  )
}