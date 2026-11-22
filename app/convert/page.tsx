"use client";

import { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Hash,
  Share2,
} from "lucide-react";

type BaseOption = {
  id: string;
  name: string;
  radix: number;
  chars: string;
  badgeColor: string;
};

const BASES: BaseOption[] = [
  { id: "2", name: "Biner", radix: 2, chars: "0, 1", badgeColor: "from-indigo-500 to-indigo-600" },
  { id: "8", name: "Oktal", radix: 8, chars: "0 – 7", badgeColor: "from-purple-500 to-purple-600" },
  { id: "10", name: "Desimal", radix: 10, chars: "0 – 9", badgeColor: "from-cyan-500 to-cyan-600" },
  { id: "16", name: "Heksadesimal", radix: 16, chars: "0 – 9, A – F", badgeColor: "from-pink-500 to-pink-600" },
];

export default function ConvertPage() {
  const [value, setValue] = useState("1062");
  const [base, setBase] = useState("10");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [tableSearch, setTableSearch] = useState("");
  const [spaceNibbles, setSpaceNibbles] = useState(true);

  const activeBaseObj = BASES.find((b) => b.id === base) || BASES[2];

  const isValidInput = (val: string, b: string) => {
    if (!val) return false;
    const clean = val.startsWith("-") ? val.slice(1) : val;
    switch (b) {
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
  };

  const isCurrentValid = useMemo(() => isValidInput(value, base), [value, base]);

  const result = useMemo(() => {
    if (!value) return null;
    if (!isValidInput(value, base)) return "invalid";

    try {
      const decimalValue = parseInt(value, parseInt(base));
      if (isNaN(decimalValue)) return "invalid";

      const rawBin = decimalValue.toString(2);
      // Nibble format (grouped by 4 bits)
      const formattedBin = rawBin.replace(/\B(?=(\d{4})+(?!\d))/g, " ");

      // 8-bit representation if within range
      const bit8 = decimalValue >= 0 && decimalValue <= 255 ? rawBin.padStart(8, "0") : null;
      const bit16 = decimalValue >= 0 && decimalValue <= 65535 ? rawBin.padStart(16, "0") : null;

      return {
        bin: rawBin,
        formattedBin,
        bit8,
        bit16,
        oct: decimalValue.toString(8),
        dec: decimalValue.toString(10),
        hex: decimalValue.toString(16).toUpperCase(),
      };
    } catch {
      return "invalid";
    }
  }, [value, base]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAll = () => {
    if (!result || typeof result === "string") return;
    const summary = `Konversi Sistem Bilangan (${activeBaseObj.name}: ${value})\n• Biner: ${result.bin}\n• Oktal: ${result.oct}\n• Desimal: ${result.dec}\n• Hex: ${result.hex}`;
    navigator.clipboard.writeText(summary);
    setCopiedField("all");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const insertChar = (char: string) => {
    setValue((prev) => prev + char);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 py-4 sm:py-8">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          Real-time Multi-Base Converter
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Konversi Sistem Bilangan
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Konversi otomatis antara Biner (2), Oktal (8), Desimal (10), dan Heksadesimal (16) dengan validasi presisi tinggi.
        </p>
      </div>

      {/* ================= MAIN CONVERTER CARD ================= */}
      <section className="bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

        {/* 1. Base Selection Segmented Tabs */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-indigo-400" />
            1. Pilih Basis Asal:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {BASES.map((b) => {
              const isActive = base === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBase(b.id)}
                  className={`p-3.5 rounded-2xl border text-left transition duration-200 flex flex-col justify-between ${
                    isActive
                      ? "bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border-indigo-500 shadow-lg shadow-indigo-500/20 text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-sm sm:text-base">{b.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-indigo-500 text-white font-bold"
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

        {/* 2. Number Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              2. Masukkan Angka {activeBaseObj.name}:
            </label>
            {value && (
              <button
                type="button"
                onClick={() => setValue("")}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" /> Bersihkan
              </button>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={`Masukkan nilai ${activeBaseObj.name}...`}
              value={value}
              onChange={(e) => setValue(e.target.value.trim())}
              className={`w-full p-4 sm:p-5 rounded-2xl bg-slate-950/90 border font-mono text-lg sm:text-xl text-white placeholder-slate-600 focus:outline-none transition ${
                !isCurrentValid && value
                  ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              }`}
            />
            {value && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isCurrentValid ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                    <AlertCircle className="w-3.5 h-3.5" /> Format Salah
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quick Helper Keypad */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 text-[11px]">Ketik Cepat:</span>
            {base === "2" && (
              <>
                <button
                  type="button"
                  onClick={() => insertChar("0")}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold transition"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => insertChar("1")}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold transition"
                >
                  1
                </button>
              </>
            )}
            {base === "16" && (
              ["A", "B", "C", "D", "E", "F"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => insertChar(c)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-300 font-mono font-bold transition"
                >
                  {c}
                </button>
              ))
            )}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Contoh:</span>
              {(base === "2" ? ["1010", "11110000"] : base === "8" ? ["77", "124"] : base === "10" ? ["255", "1024"] : ["FF", "1A3F"]).map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setValue(ex)}
                  className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-indigo-300 hover:border-indigo-500 transition font-mono"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {!isCurrentValid && value && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Angka tidak valid untuk <strong>{activeBaseObj.name}</strong>. Karakter yang diperbolehkan hanya: <code>{activeBaseObj.chars}</code>.
              </span>
            </div>
          )}
        </div>

        {/* 3. Output Results Grid */}
        {result && typeof result !== "string" && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Hasil Konversi:
              </h2>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSpaceNibbles(!spaceNibbles)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
                >
                  <span className={`w-3 h-3 rounded-full border ${spaceNibbles ? "bg-indigo-500 border-indigo-400" : "bg-transparent border-slate-600"}`} />
                  Pemisah 4-Bit Biner
                </button>

                <button
                  type="button"
                  onClick={copyAll}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 border border-indigo-500/30 flex items-center gap-1.5 transition"
                >
                  {copiedField === "all" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === "all" ? "Tersalin!" : "Salin Semua"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* BINARY CARD */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Biner (Basis 2)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.bin, "bin")}
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
                  {spaceNibbles ? result.formattedBin : result.bin}
                </p>
                {result.bit8 && (
                  <p className="text-[11px] text-slate-400 font-mono">
                    Format 8-Bit: <span className="text-indigo-300">{result.bit8}</span>
                  </p>
                )}
              </div>

              {/* OCTAL CARD */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 hover:border-purple-500/40 transition space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Oktal (Basis 8)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.oct, "oct")}
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
                  {result.oct}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Prefiks: <span className="text-purple-300">0o{result.oct}</span>
                </p>
              </div>

              {/* DECIMAL CARD */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Desimal (Basis 10)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.dec, "dec")}
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
                  {result.dec}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Sistem Bilangan Manusia (Basis 10)
                </p>
              </div>

              {/* HEXADECIMAL CARD */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 hover:border-pink-500/40 transition space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Heksadesimal (Basis 16)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.hex, "hex")}
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
                  {result.hex}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Prefiks: <span className="text-pink-300">0x{result.hex}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================= TABEL REFERENSI (0 - 15) ================= */}
      <section className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-indigo-400" />
              Tabel Referensi Cepat (0–15)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Konversi standar 4-bit biner, oktal, desimal, dan heksadesimal 1 digit.
            </p>
          </div>

          <input
            type="text"
            placeholder="Cari nilai..."
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 w-full sm:w-48"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-center text-sm font-mono">
            <thead className="bg-slate-950/80 text-slate-300 border-b border-slate-800">
              <tr>
                <th className="p-3 text-cyan-400 font-semibold">Desimal (10)</th>
                <th className="p-3 text-indigo-400 font-semibold">Biner (2)</th>
                <th className="p-3 text-purple-400 font-semibold">Oktal (8)</th>
                <th className="p-3 text-pink-400 font-semibold">Heksadesimal (16)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {Array.from({ length: 16 })
                .map((_, i) => ({
                  dec: i.toString(),
                  bin: i.toString(2).padStart(4, "0"),
                  oct: i.toString(8),
                  hex: i.toString(16).toUpperCase(),
                }))
                .filter((row) =>
                  !tableSearch ||
                  row.dec.includes(tableSearch) ||
                  row.bin.includes(tableSearch) ||
                  row.oct.includes(tableSearch) ||
                  row.hex.toLowerCase().includes(tableSearch.toLowerCase())
                )
                .map((row) => (
                  <tr key={row.dec} className="hover:bg-indigo-950/20 transition group">
                    <td className="p-3 text-slate-200">{row.dec}</td>
                    <td className="p-3 text-indigo-300 font-semibold">{row.bin}</td>
                    <td className="p-3 text-purple-300">{row.oct}</td>
                    <td className="p-3 text-pink-300 font-semibold">{row.hex}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= PENJELASAN EDUKATIF ================= */}
      <section className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-400" />
          Konsep & Rumus Dasar Konversi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-indigo-300 text-base">Metode Pembagian Berulang</h3>
            <p className="leading-relaxed">
              Untuk mengonversi dari Desimal ke basis lain (Biner, Oktal, Hex), lakukan pembagian berulang dengan nilai basis dan kumpulkan sisa pembagian (modulo) dari urutan bawah ke atas.
            </p>
            <div className="font-mono text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg">
              13 / 2 = 6 sisa 1<br />
              6 / 2 = 3 sisa 0<br />
              3 / 2 = 1 sisa 1<br />
              1 / 2 = 0 sisa 1 &rarr; (1101)₂
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-purple-300 text-base">Metode Posisi Berbobot (Bobot Pangkat)</h3>
            <p className="leading-relaxed">
              Untuk mengonversi basis apapun kembali ke Desimal, kalikan setiap digit dengan basis pangkat posisinya (mulai dari indeks 0 di ujung paling kanan).
            </p>
            <div className="font-mono text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg">
              (1101)₂ = (1×2³) + (1×2²) + (0×2¹) + (1×2⁰)<br />
              = 8 + 4 + 0 + 1<br />
              = (13)₁₀
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
