import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NumConvert Pro",
  description: "Aplikasi edukasi sistem bilangan digital berbasis Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 min-h-screen text-white`}
      >
        <Navbar />
        <main className="container mx-auto px-6 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
