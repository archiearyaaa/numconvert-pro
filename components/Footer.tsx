import { Linkedin, Instagram, Github, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-10 text-center space-y-6">
        
        {/* Title */}
        <div>
          <h2 className="text-lg font-semibold text-indigo-400">
            Archie Arya Manggala
          </h2>
          <p className="text-sm text-white/60">
            Developer • Software Engineering Technology
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          <Link
            href="https://www.linkedin.com/in/archiearyamanggala/"
            target="_blank"
            className="p-3 bg-white/10 rounded-full hover:bg-indigo-500 transition"
          >
            <Linkedin size={20} />
          </Link>

          <Link
            href="https://www.instagram.com/archiearyaaa/"
            target="_blank"
            className="p-3 bg-white/10 rounded-full hover:bg-pink-500 transition"
          >
            <Instagram size={20} />
          </Link>

          <Link
            href="https://github.com/archiearyaaa"
            target="_blank"
            className="p-3 bg-white/10 rounded-full hover:bg-gray-700 transition"
          >
            <Github size={20} />
          </Link>

          
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/40 pt-4 border-t border-white/10">
          © {new Date().getFullYear()} NumConvert Pro • Built with Next.js & Tailwind CSS
        </div>
      </div>
    </footer>
  )
}