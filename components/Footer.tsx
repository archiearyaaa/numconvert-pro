"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Github, User, X, GraduationCap, BookOpen, Award, ExternalLink } from "lucide-react";

export default function Footer() {
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);

  return (
    <>
      <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl relative">
        <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-slate-800/60">
            {/* Column 1: Brand & Developer Bio */}
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                <span className="text-indigo-400">Archie Arya Manggala</span>
              </h2>
              <p className="text-sm text-slate-400 max-w-sm">
                Software Engineering Technology • Pengembang NumConvert Pro untuk pembelajaran sistem bilangan digital.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => setShowDeveloperModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 border border-indigo-500/30 transition duration-200"
                >
                  <User className="w-3.5 h-3.5" />
                  Info Developer & Tugas Kuliah
                </button>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
              <Link href="/" className="hover:text-indigo-400 transition">
                Beranda
              </Link>
              <Link href="/convert" className="hover:text-indigo-400 transition">
                Konverter Bilangan
              </Link>
              <Link href="/calculator" className="hover:text-indigo-400 transition">
                Kalkulator Digital
              </Link>
            </div>

            {/* Column 3: Social Icons */}
            <div className="flex justify-center md:justify-end gap-3">
              <Link
                href="https://www.linkedin.com/in/archiearyamanggala/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Archie Arya Manggala"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition duration-300 shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </Link>

              <Link
                href="https://www.instagram.com/archiearyaaa/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @archiearyaaa"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition duration-300 shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </Link>

              <Link
                href="https://github.com/archiearyaaa"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub @archiearyaaa"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition duration-300 shadow-sm"
              >
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Copyright section */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
            <p suppressHydrationWarning>
              © {new Date().getFullYear()} <span className="text-slate-300 font-medium">Archie Arya Manggala</span>. All rights reserved.
            </p>
            <p className="text-slate-400">
              NumConvert Pro • Solusi Konversi Sistem Bilangan Digital
            </p>
          </div>
        </div>
      </footer>

      {/* Developer & Academic Details Modal */}
      {showDeveloperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setShowDeveloperModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Avatar & Title */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <Image
                  src="/profil.png"
                  alt="Archie Arya Manggala"
                  width={110}
                  height={110}
                  className="rounded-full border-4 border-indigo-500 shadow-xl w-24 h-24 sm:w-28 sm:h-28 object-cover"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Archie Arya Manggala</h3>
                <p className="text-sm text-indigo-400 font-medium">NIM: 1062336</p>
              </div>
            </div>

            {/* Academic Info Grid */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Program Studi</p>
                  <p className="font-semibold text-slate-200">Teknologi Rekayasa Perangkat Lunak</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Mata Kuliah</p>
                  <p className="font-semibold text-slate-200">Elektronika Digital</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Dosen Pengampu</p>
                  <p className="font-semibold text-slate-200">Irwan , S.ST., M.Sc., Ph.D.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center leading-relaxed">
              Aplikasi ini dikembangkan sebagai bagian dari tugas perkuliahan untuk memahami konsep sistem bilangan digital, konversi antar basis, dan implementasi kalkulator digital interaktif.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <Link
                href="https://github.com/archiearyaaa"
                target="_blank"
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              >
                <Github className="w-4 h-4" />
                GitHub Profil
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>
              <button
                onClick={() => setShowDeveloperModal(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
