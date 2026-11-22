"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  ArrowRightLeft,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Hash,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type BaseType = "2" | "8" | "10" | "16";

const BASES: { id: BaseType; name: string; radix: number; chars: string }[] = [
  { id: "2", name: "Biner", radix: 2, chars: "0, 1" },
  { id: "8", name: "Oktal", radix: 8, chars: "0 – 7" },
  { id: "10", name: "Desimal", radix: 10, chars: "0 – 9" },
  { id: "16", name: "Heksadesimal", radix: 16, chars: "0 – 9, A – F" },
];

const OPERATORS = [
  { symbol: "+", label: "Tambah (+)", desc: "Penjumlahan" },
  { symbol: "-", label: "Kurang (−)", desc: "Pengurangan" },
  { symbol: "*", label: "Kali (×)", desc: "Perkalian" },
  { symbol: "/", label: "Bagi (÷)", desc: "Pembagian Bulat" },
];

function calculate(a: number, b: number, op: string): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) throw new Error("Tidak dapat membagi dengan angka 0");
      return Math.floor(a / b);
    default:
      throw new Error("Operator tidak valid");
  }
}

function isValidInput(val: string, base: string) {
  if (!val) return false;
  const clean = val.startsWith("-") ? val.slice(1) : val;
  switch (base) {
    case "2":
      return /^[01]+$/.test(clean);
    case "8":
      return /^[0-7]+$/.test(clean);
    case "10":
      return /^[0-9]+$/.test(clean);
    case "16":
      return /^[0-9a-fA-F]+$/.test(clean);
    default:
      return false;
  }
}

export default function CalculatorPage() {
  const [base, setBase] = useState<BaseType>("2");
  const [num1, setNum1] = useState("1010");
  const [num2, setNum2] = useState("0011");
  const [operator, setOperator] = useState("+");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeInput, setActiveInput] = useState<"num1" | "num2">("num1");
  const [showSteps, setShowSteps] = useState(true);

  const activeBaseObj = BASES.find((b) => b.id === base) || BASES[0];

  const isValid1 = useMemo(() => isValidInput(num1, base), [num1, base]);
  const isValid2 = useMemo(() => isValidInput(num2, base), [num2, base]);

  const calculationData = useMemo(() => {
    if (!num1 || !num2) return null;
    if (!isValid1 || !isValid2) {
      return { error: `Input tidak valid. Basis ${activeBaseObj.name} hanya menerima karakter: ${activeBaseObj.chars}` };
    }

    try {
      const dec1 = parseInt(num1, parseInt(base));
      const dec2 = parseInt(num2, parseInt(base));

      if (isNaN(dec1) || isNaN(dec2)) {
        return { error: "Terjadi kesalahan parsing nilai angka." };
      }

      if (operator === "/" && dec2 === 0) {
        return { error: "Operasi pembagian dengan 0 tidak terdefinisi (Division by Zero)." };
      }

      const calc = calculate(dec1, dec2, operator);
      const isNegative = calc < 0;
      const absCalc = Math.abs(calc);

      const bin = (isNegative ? "-" : "") + absCalc.toString(2);
      const oct = (isNegative ? "-" : "") + absCalc.toString(8);
      const dec = calc.toString(10);
      const hex = (isNegative ? "-" : "") + absCalc.toString(16).toUpperCase();

      return {
        dec1,
        dec2,
        calc,
        isNegative,
        binary: bin,
        formattedBin: bin.replace(/\B(?=(\d{4})+(?!\d))/g, " "),
        octal: oct,
        decimal: dec,
        hex: hex,
      };
    } catch (err: any) {
      return { error: err.message || "Perhitungan gagal." };
    }
  }, [num1, num2, operator, base, isValid1, isValid2, activeBaseObj]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSwap = () => {
    const temp = num1;
    setNum1(num2);
    setNum2(temp);
  };

  const handleClear = () => {
    setNum1("");
    setNum2("");
  };

  const appendChar = (char: string) => {
    if (activeInput === "num1") {
      setNum1((prev) => prev + char);
    } else {
      setNum2((prev) => prev + char);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 py-4 sm:py-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
          <Calculator className="w-3.5 h-3.5" />
          Real-Time Multi-Base Digital Arithmetic
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Kalkulator Aritmatika Digital
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Lakukan perhitungan matematika langsung dalam basis Biner, Oktal, Desimal, atau Heksadesimal secara real-time.
        </p>
      </div>

      {/* ================= CALCULATOR BOARD ================= */}
      <section className="bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500" />

        {/* 1. Base Selector */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-purple-400" />
            1. Basis Operasi Matematika:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {BASES.map((b) => {
              const isActive = base === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setBase(b.id);
                    // auto sample
                    if (b.id === "2") { setNum1("1010"); setNum2("0011"); }
                    else if (b.id === "8") { setNum1("17"); setNum2("5"); }
                    else if (b.id === "10") { setNum1("25"); setNum2("5"); }
                    else if (b.id === "16") { setNum1("A5"); setNum2("F"); }
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition duration-200 flex flex-col justify-between ${
                    isActive
                      ? "bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border-purple-500 shadow-lg shadow-purple-500/20 text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-sm sm:text-base">{b.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-purple-500 text-white font-bold"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      B-{b.id}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1">Karakter: {b.chars}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Operands and Operator Pad */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              2. Masukkan Operan & Pilih Operator:
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSwap}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 transition"
                title="Tukar Posisi Angka"
              >
                <ArrowRightLeft className="w-3 h-3" /> Tukar Posisi
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 transition"
                title="Bersihkan Semua"
              >
                <RotateCcw className="w-3 h-3" /> Bersihkan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Input 1 */}
            <div className="sm:col-span-5 relative">
              <input
                type="text"
                placeholder="Angka Pertama..."
                value={num1}
                onFocus={() => setActiveInput("num1")}
                onChange={(e) => setNum1(e.target.value.trim())}
                className={`w-full p-4 rounded-2xl bg-slate-950/90 border font-mono text-lg text-white placeholder-slate-600 focus:outline-none transition ${
                  activeInput === "num1" ? "ring-2 ring-purple-500/20" : ""
                } ${
                  !isValid1 && num1 ? "border-rose-500" : "border-slate-700 focus:border-purple-500"
                }`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                A ({activeBaseObj.name})
              </span>
            </div>

            {/* Operator Buttons */}
            <div className="sm:col-span-2 flex justify-center gap-1.5">
              {OPERATORS.map((op) => (
                <button
                  key={op.symbol}
                  type="button"
                  onClick={() => setOperator(op.symbol)}
                  className={`w-11 h-11 rounded-xl font-bold text-lg flex items-center justify-center transition ${
                    operator === op.symbol
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                      : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                  title={op.desc}
                >
                  {op.symbol === "*" ? "×" : op.symbol === "/" ? "÷" : op.symbol}
                </button>
              ))}
            </div>

            {/* Input 2 */}
            <div className="sm:col-span-5 relative">
              <input
                type="text"
                placeholder="Angka Kedua..."
                value={num2}
                onFocus={() => setActiveInput("num2")}
                onChange={(e) => setNum2(e.target.value.trim())}
                className={`w-full p-4 rounded-2xl bg-slate-950/90 border font-mono text-lg text-white placeholder-slate-600 focus:outline-none transition ${
                  activeInput === "num2" ? "ring-2 ring-purple-500/20" : ""
                } ${
                  !isValid2 && num2 ? "border-rose-500" : "border-slate-700 focus:border-purple-500"
                }`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                B ({activeBaseObj.name})
              </span>
            </div>
          </div>

          {/* Quick Keypad */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 text-xs">
            <span className="text-slate-400 text-[11px]">
              Ketik ke {activeInput === "num1" ? "Angka A" : "Angka B"}:
            </span>
            {base === "2" && (
              <>
                <button
                  type="button"
                  onClick={() => appendChar("0")}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold transition"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => appendChar("1")}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold transition"
                >
                  1
                </button>
              </>
            )}
            {base === "16" &&
              ["A", "B", "C", "D", "E", "F"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => appendChar(c)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-300 font-mono font-bold transition"
                >
                  {c}
                </button>
              ))}
          </div>

          {/* Error Message */}
          {calculationData && "error" in calculationData && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{calculationData.error}</span>
            </div>
          )}
        </div>

        {/* 3. Results Section */}
        {calculationData && !("error" in calculationData) && (
          <div className="space-y-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Hasil Perhitungan ({activeBaseObj.name}):
              </h2>

              <button
                type="button"
                onClick={() => setShowSteps(!showSteps)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
              >
                {showSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {showSteps ? "Sembunyikan Langkah" : "Lihat Langkah Hitung"}
              </button>
            </div>

            {/* Step-by-Step Breakdown Accordion */}
            {showSteps && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-purple-500/20 space-y-3 text-xs sm:text-sm">
                <p className="font-semibold text-purple-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  Langkah-Langkah Perhitungan Sistem:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px]">Langkah 1: Nilai Desimal</span>
                    <p className="text-slate-200">
                      A = ({num1})<sub>{base}</sub> &rarr; <strong>{calculationData.dec1}</strong>
                    </p>
                    <p className="text-slate-200">
                      B = ({num2})<sub>{base}</sub> &rarr; <strong>{calculationData.dec2}</strong>
                    </p>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px]">Langkah 2: Operasi Aritmatika</span>
                    <p className="text-slate-200">
                      {calculationData.dec1} {operator === "*" ? "×" : operator === "/" ? "÷" : operator} {calculationData.dec2}
                    </p>
                    <p className="text-indigo-400 font-bold">
                      = {calculationData.calc} (Desimal)
                    </p>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px]">Langkah 3: Konversi ke {activeBaseObj.name}</span>
                    <p className="text-slate-200">
                      Hasil ({activeBaseObj.name}) ={" "}
                      <strong className="text-emerald-400">
                        {base === "2"
                          ? calculationData.binary
                          : base === "8"
                          ? calculationData.octal
                          : base === "10"
                          ? calculationData.decimal
                          : calculationData.hex}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Output Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Biner */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Hasil Biner (Basis 2)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(calculationData.binary, "bin")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Salin Biner"
                  >
                    {copiedField === "bin" ? (
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Tersalin
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="font-mono text-lg sm:text-xl font-bold text-white break-all tracking-wide">
                  {calculationData.formattedBin}
                </p>
              </div>

              {/* Oktal */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 hover:border-purple-500/40 transition space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Hasil Oktal (Basis 8)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(calculationData.octal, "oct")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Salin Oktal"
                  >
                    {copiedField === "oct" ? (
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Tersalin
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="font-mono text-lg sm:text-xl font-bold text-white break-all">
                  {calculationData.octal}
                </p>
              </div>

              {/* Desimal */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Hasil Desimal (Basis 10)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(calculationData.decimal, "dec")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Salin Desimal"
                  >
                    {copiedField === "dec" ? (
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Tersalin
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="font-mono text-lg sm:text-xl font-bold text-white break-all">
                  {calculationData.decimal}
                </p>
              </div>

              {/* Heksadesimal */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 hover:border-pink-500/40 transition space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Hasil Heksadesimal (Basis 16)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(calculationData.hex, "hex")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Salin Hex"
                  >
                    {copiedField === "hex" ? (
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Tersalin
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="font-mono text-lg sm:text-xl font-bold text-white break-all">
                  {calculationData.hex}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================= EDUKASI ARITMATIKA DIGITAL ================= */}
      <section className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          Konsep Aritmatika Sistem Bilangan Digital
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-indigo-300 text-sm">Penjumlahan Biner (Carry)</h3>
            <p className="leading-relaxed">
              Penjumlahan biner menggunakan aturan: <code>0+0=0</code>, <code>0+1=1</code>, <code>1+0=1</code>, dan <code>1+1=0</code> dengan simpanan (carry) 1 ke kolom berikutnya.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-purple-300 text-sm">Pembagian Bulat (Integer Division)</h3>
            <p className="leading-relaxed">
              Operasi pembagian digital pada kalkulator ini dibulatkan ke bawah (<code>Math.floor</code>) sesuai standar arsitektur ALU CPU yang memisahkan hasil bagi integer (quotient) dan sisa (remainder).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-pink-300 text-sm">Heksadesimal dalam Pemrograman</h3>
            <p className="leading-relaxed">
              Aritmatika heksadesimal memungkinkan manipulasi byte dan word tanpa harus menulis rentetan bit biner yang panjang (misalnya <code>0xFF + 1 = 0x100</code>).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
