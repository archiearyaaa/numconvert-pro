# NumConvert Pro ⚡

<p align="center">
  <img src="public/profil.png" alt="NumConvert Pro Banner" width="120" style="border-radius: 50%; border: 3px solid #6366f1;" />
</p>

<p align="center">
  <strong>Solusi Terpadu Konversi & Kalkulator Aritmatika Sistem Bilangan Digital</strong><br />
  Platform edukasi interaktif untuk memahami logika bilangan Biner, Oktal, Desimal, dan Heksadesimal.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-All_Rights_Reserved-indigo?style=for-the-badge" alt="License" />
</p>

---

## 📌 Tentang Proyek

**NumConvert Pro** adalah aplikasi web modern berbasis **Next.js (App Router)** yang dirancang untuk mempermudah konversi dan komputasi aritmatika sistem bilangan digital secara *real-time*.

Aplikasi ini dikembangkan sebagai bagian dari tugas perkuliahan mata kuliah **Elektronika Digital** untuk memahami representasi data biner pada arsitektur komputer, logika sirkuit digital, dan manipulasi bilangan berbasis *radix*.

---

## ✨ Fitur Utama

### 1. 🔄 Konversi Multi-Arah Real-Time (`/convert`)
- **Simultan 4 Basis:** Masukkan angka pada salah satu basis, dan sistem akan langsung mengonversinya ke:
  - **Biner (Basis 2)**
  - **Oktal (Basis 8)**
  - **Desimal (Basis 10)**
  - **Heksadesimal (Basis 16)**
- **Format Nibble (4-bit):** Dilengkapi pemisah otomatis 4-bit (`1010 1100`) untuk kemudahan membaca representasi data biner.
- **Dukungan 8-bit & 16-bit:** Menampilkan padding byte standar komputer.
- **Quick Keypad:** Tombol instan untuk karakter biner (`0`, `1`) dan heksadesimal (`A`–`F`).
- **One-Click Copy:** Salin hasil konversi tiap basis atau salin rangkuman lengkap sekaligus.
- **Tabel Referensi 0–15:** Tabel perbandingan nilai heksadesimal, desimal, biner, dan oktal dengan fitur pencarian instan.

### 2. 🧮 Kalkulator Aritmatika Digital (`/calculator`)
- **Multi-Base Arithmetic:** Lakukan operasi penjumlahan (`+`), pengurangan (`−`), perkalian (`×`), dan pembagian (`÷`) langsung dalam basis yang dipilih.
- **Step-by-Step Breakdown:** Menampilkan tahapan perhitungan matematis secara transparan:
  1. Konversi kedua operan ke nilai desimal.
  2. Eksekusi operasi aritmatika pada unit desimal.
  3. Konversi balik hasil akhir ke seluruh basis digital.
- **Fitur Cepat:** Tukar posisi angka (*Swap Operands* ⇄) dan tombol reset (*Clear* C).
- **Penanganan Khusus Pembagian:** Menerapkan pembagian bilangan bulat (*integer division* via `Math.floor`) sesuai standar unit logika aritmatika (ALU) pada prosesor.

### 3. 🎨 Desain Modern & Responsif
- **Glassmorphism UI:** Tampilan gelap (*Dark Mode*) futuristik dengan efek pencahayaan aksen *indigo & purple glow*.
- **Mobile Friendly:** Navigasi responsif dengan menu drawer interaktif untuk smartphone dan tablet.
- **Zero Hydration Error:** Dioptimalkan secara menyeluruh dengan `suppressHydrationWarning` untuk kompatibilitas ekstensi peramban.

---

## 🛠️ Tech Stack

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router, Turbopack / Webpack) |
| **Library UI** | [React 19](https://react.dev/) |
| **Bahasa** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Ikon** | [Lucide React](https://lucide.dev/) |
| **Utility** | `clsx`, `jspdf` |

---

## 📁 Struktur Direktori

```text
numconvert/
├── app/
│   ├── calculator/
│   │   └── page.tsx        # Halaman kalkulator aritmatika digital
│   ├── convert/
│   │   └── page.tsx        # Halaman konversi sistem bilangan & tabel
│   ├── globals.css         # Konfigurasi Tailwind & custom scrollbar
│   ├── layout.tsx          # Root layout & efek ambient glow
│   └── page.tsx            # Halaman utama (Hero, Quick Preview, 4 Pilar)
├── components/
│   ├── Footer.tsx          # Footer dengan copyright & modal developer
│   └── Navbar.tsx          # Navigasi glassmorphic responsif
├── hooks/
│   └── useConversion.ts    # Custom hook logika konversi
├── lib/
│   ├── binaryUtils.ts      # Helper bitwise & 2's complement
│   ├── calculator.ts       # Logika perhitungan aritmatika
│   └── conversion.ts       # Fungsi validasi & konversi basis
├── public/
│   └── profil.png          # Foto profil pengembang
├── package.json
└── README.md
```

---

## 🚀 Panduan Memulai (*Local Development*)

### 1. Clone Repositori
```bash
git clone https://github.com/archiearyaaa/numconvert-pro.git
cd numconvert-pro
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 👨‍💻 Profil Pengembang & Informasi Akademik

Proyek ini dikembangkan oleh:

- **Nama:** Archie Arya Manggala
- **NIM:** 1062336
- **Program Studi:** Teknologi Rekayasa Perangkat Lunak (TRPL)
- **Mata Kuliah:** Elektronika Digital
- **Dosen Pengampu:** Irwan, S.ST., M.Sc., Ph.D.

---

## 📄 Lisensi & Hak Cipta

© 2026 **Archie Arya Manggala**. *All rights reserved.*
