import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 space-y-20">
      {/* ================= HERO ================= */}
      <section className="text-center space-y-8 max-w-3xl">
        <h1 className="text-6xl font-extrabold tracking-tight">
          NumConvert <span className="text-indigo-400">Pro</span>
        </h1>

        <p className="text-lg text-white/70">
          Aplikasi edukasi sistem bilangan digital untuk konversi dan
          perhitungan berbasis biner, oktal, desimal, dan hexadecimal.
        </p>

        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          <Link
            href="/convert"
            className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            Konversi
          </Link>

          <Link
            href="/calculator"
            className="px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            Kalkulator
          </Link>
        </div>
      </section>

      <div className="flex justify-center gap-3 flex-wrap text-sm text-white/60">
        <span className="px-3 py-1 bg-white/10 rounded-full">Next.js</span>
        <span className="px-3 py-1 bg-white/10 rounded-full">React</span>
        <span className="px-3 py-1 bg-white/10 rounded-full">TypeScript</span>
        <span className="px-3 py-1 bg-white/10 rounded-full">Tailwind CSS</span>
      </div>

      {/* ================= ABOUT DEVELOPER ================= */}
      <section className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 max-w-2xl w-full space-y-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-center">Tentang Developer</h2>

        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/profil.png"
            alt="Foto Developer"
            width={140}
            height={140}
            className="rounded-full border-4 border-indigo-400 shadow-lg"
          />

          <div className="space-y-2 text-white/80 text-center">
            <p>
              <strong>Nama:</strong> Archie Arya Manggala
            </p>
            <p>
              <strong>NIM:</strong> 1062336
            </p>
            <p>
              <strong>Program Studi:</strong> Teknologi Rekayasa Perangkat Lunak
            </p>
            <p>
              <strong>Mata Kuliah:</strong> Elektronika Digital
            </p>
            <p>
              <strong>Dosen Pengampu:</strong> Irwan , S.ST., M.Sc., Ph.D.
            </p>
          </div>

          <p className="text-white/60 text-sm text-center max-w-md">
            Aplikasi ini dikembangkan sebagai bagian dari tugas perkuliahan
            untuk memahami konsep sistem bilangan digital dan implementasinya
            menggunakan Next.js.
          </p>
        </div>
      </section>
    </main>
  );
}
