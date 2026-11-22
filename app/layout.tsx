import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NumConvert Pro • Sistem Bilangan Digital",
  description: "Aplikasi edukasi sistem bilangan digital untuk konversi dan kalkulator aritmatika multi-basis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white"
      >
        {/* Background glow effects */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px]" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
