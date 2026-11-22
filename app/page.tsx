"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  Calculator,
  Binary,
  Cpu,
  BookOpen,
  Sparkles,
  Check,
  Copy,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  // Quick converter state for interactive preview on home page
  const [quickInput, setQuickInput] = useState("42");
  const [quickBase, setQuickBase] = useState("10");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isValidQuick = useMemo(() => {
    if (!quickInput) return false;
    const clean = quickInput.startsWith("-") ? quickInput.slice(1) : quickInput;
    switch (quickBase) {
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
  }, [quickInput, quickBase]);

  const quickResult = useMemo(() => {
    if (!quickInput || !isValidQuick) return null;
    try {
      const dec = parseInt(quickInput, parseInt(quickBase));
      if (isNaN(dec)) return null;
      return {
        bin: dec.toString(2),
        oct: dec.toString(8),
        dec: dec.toString(10),
        hex: dec.toString(16).toUpperCase(),
      };
    } catch {
      return null;
    }
  }, [quickInput, quickBase, isValidQuick]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-20 sm:space-y-28 py-6 sm:py-10">
      {/* ================= HERO SECTION ================= */}
      <section className="text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto relative">
        {/* Glow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Sistem Bilangan Digital & Aritmatika Multi-Basis</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15] text-white">
          NumConvert{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Pro
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Platform interaktif untuk konversi cepat dan kalkulator aritmatika sistem bilangan digital:
          <span className="text-indigo-300 font-semibold"> Biner</span>,
          <span className="text-purple-300 font-semibold"> Oktal</span>,
          <span className="text-cyan-300 font-semibold"> Desimal</span>, dan
          <span className="text-pink-300 font-semibold"> Heksadesimal</span> secara real-time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/convert"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white rounded-2xl font-semibold shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:scale-102 transition duration-300 flex items-center justify-center gap-2.5 group"
          >
            <ArrowRightLeft className="w-5 h-5 text-indigo-200 group-hover:rotate-180 transition duration-500" />
            <span>Mulai Konversi</span>
            <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition duration-200" />
          </Link>

          <Link
            href="/calculator"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-2xl font-semibold border border-slate-700/80 shadow-lg hover:border-slate-600 hover:scale-102 transition duration-300 flex items-center justify-center gap-2.5"
          >
            <Calculator className="w-5 h-5 text-purple-400" />
            <span>Kalkulator Multi-Basis</span>
          </Link>
        </div>
      </section>

      {/* ================= QUICK PREVIEW CONVERTER WIDGET ================= */}
      <section className="max-w-3xl mx-auto w-full">
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle accent border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Uji Coba Konversi Langsung
              </h2>
              <p className="text-xs text-slate-400">
                Ketik angka di bawah untuk melihat hasil konversi 4 basis seketika
              </p>
            </div>
            <Link
              href="/convert"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto transition"
            >
              Fitur Lengkap <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Input Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value.trim())}
                placeholder="Masukkan angka..."
                className={`w-full p-3.5 rounded-2xl bg-slate-950/80 border text-white font-mono text-base focus:outline-none transition ${
                  !isValidQuick && quickInput
                    ? "border-rose-500/80 focus:border-rose-500"
                    : "border-slate-700/80 focus:border-indigo-500"
                }`}
              />
              {!isValidQuick && quickInput && (
                <span className="text-[11px] text-rose-400 mt-1 block">
                  Input tidak valid untuk basis yang dipilih.
                </span>
              )}
            </div>

            <select
              value={quickBase}
              onChange={(e) => setQuickBase(e.target.value)}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="10">Desimal (Basis 10)</option>
              <option value="2">Biner (Basis 2)</option>
              <option value="8">Oktal (Basis 8)</option>
              <option value="16">Heksadesimal (16)</option>
            </select>
          </div>

          {/* Quick Result Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { label: "Biner (2)", val: quickResult?.bin, key: "bin", color: "indigo" },
              { label: "Oktal (8)", val: quickResult?.oct, key: "oct", color: "purple" },
              { label: "Desimal (10)", val: quickResult?.dec, key: "dec", color: "cyan" },
              { label: "Hexadesimal (16)", val: quickResult?.hex, key: "hex", color: "pink" },
            ].map((item) => (
              <div
                key={item.key}
                className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-between group hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>{item.label}</span>
                  {item.val && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.val!, item.key)}
                      className="text-slate-400 hover:text-white p-1 rounded-md transition"
                      title="Salin"
                    >
                      {copiedKey === item.key ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      )}
                    </button>
                  )}
                </div>
                <div className="font-mono font-bold text-sm sm:text-base text-white truncate">
                  {item.val ?? "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Fitur Unggulan NumConvert Pro
          </h2>
          <p className="text-sm text-slate-400">
            Didesain khusus untuk mempermudah pemahaman logika digital dan perhitungan sistem bilangan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition duration-300">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Konversi Multi-Arah</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Konversi otomatis simultan antara Biner, Oktal, Desimal, dan Heksadesimal secara real-time saat Anda mengetik.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-slate-800/80 hover:border-purple-500/50 hover:bg-slate-900/80 transition duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition duration-300">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Kalkulator Aritmatika</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Operasi matematika (+, −, ×, ÷) antar basis digital dengan perhitungan instan dan hasil dalam seluruh sistem bilangan.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/80 transition duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition duration-300">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Format & Salin Cepat</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Dukungan pengelompokan 4-bit nibbles biner, tombol one-click copy, serta validasi kesalahan input secara presisi.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-slate-800/80 hover:border-pink-500/50 hover:bg-slate-900/80 transition duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition duration-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Referensi & Materi</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tabel referensi nilai 0 hingga 15 dan rangkuman konsep dasar sistem bilangan untuk keperluan akademik.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4 NUMBER SYSTEMS EXPLAINED ================= */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            4 Pilar Sistem Bilangan Digital
          </h2>
          <p className="text-sm text-slate-400">
            Karakteristik dan pemanfaatan masing-masing basis bilangan dalam teknologi komputer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Binary */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm">
                  2
                </span>
                <h3 className="font-bold text-lg text-white">Sistem Biner (Binary)</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                Radix: 2
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Menggunakan 2 digit: <strong>0</strong> dan <strong>1</strong>. Merupakan bahasa paling mendasar bagi komputer (level transistor / tegangan ON dan OFF).
            </p>
            <div className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl font-mono">
              Contoh: (1010)₂ = (10)₁₀
            </div>
          </div>

          {/* Octal */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm">
                  8
                </span>
                <h3 className="font-bold text-lg text-white">Sistem Oktal (Octal)</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
                Radix: 8
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Menggunakan 8 digit: <strong>0 hingga 7</strong>. Mampu merepresentasikan 3 bit biner dalam satu digit, sering dipakai pada sistem perizinan file Linux (chmod).
            </p>
            <div className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl font-mono">
              Contoh: (12)₈ = (10)₁₀
            </div>
          </div>

          {/* Decimal */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm">
                  10
                </span>
                <h3 className="font-bold text-lg text-white">Sistem Desimal (Decimal)</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                Radix: 10
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Menggunakan 10 digit: <strong>0 hingga 9</strong>. Sistem bilangan posisi standar yang paling familiar dan digunakan manusia dalam kehidupan sehari-hari.
            </p>
            <div className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl font-mono">
              Contoh: (10)₁₀ = (10)₁₀
            </div>
          </div>

          {/* Hexadecimal */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-sm">
                  16
                </span>
                <h3 className="font-bold text-lg text-white">Sistem Heksadesimal (Hex)</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 font-mono">
                Radix: 16
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Menggunakan 16 simbol: <strong>0–9 dan A–F</strong> (A=10 s/d F=15). Setiap digit mewakili 4 bit (nibble), sangat populer untuk alamat memori, kode warna CSS, dan UUID.
            </p>
            <div className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl font-mono">
              Contoh: (A)₁₆ = (10)₁₀
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900/60 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Siap Menghitung dan Mengonversi?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Gunakan alat konversi lengkap atau kalkulator real-time untuk mempercepat tugas dan analisis digital Anda.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/convert"
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition hover:scale-102"
          >
            Buka Konverter Bilangan
          </Link>
          <Link
            href="/calculator"
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold border border-slate-700 transition hover:scale-102"
          >
            Buka Kalkulator Multi-Basis
          </Link>
        </div>
      </section>
    </div>
  );
}
