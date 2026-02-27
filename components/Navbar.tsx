import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="backdrop-blur-lg bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          NumConvert <span className="text-indigo-400">Pro</span>
        </h1>

        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link href="/convert" className="hover:text-indigo-400 transition">
            Konversi
          </Link>
          <Link href="/calculator" className="hover:text-indigo-400 transition">
            Kalkulator
          </Link>
        </div>
      </div>
    </nav>
  )
}