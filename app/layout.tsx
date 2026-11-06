import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Elastos Library",
  description: "A quiet place for every good book.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfair.variable} bg-[#fbf9f5] text-[#29231e] [font-family:var(--font-dm-sans)]`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
