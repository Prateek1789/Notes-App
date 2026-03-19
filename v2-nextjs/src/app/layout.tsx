import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import ThemeProvider from "@/components/layout/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteFlow",
  description: "A modern, animated landing page for a feature-rich note-taking application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="w-full h-auto px-2 flex items-center justify-center top-2 left-0 fixed z-999">
            <Navbar />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
