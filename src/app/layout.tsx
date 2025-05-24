import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Corrected import: Geist_Mono
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster for potential notifications

const geistSans = Geist({ // Corrected instantiation
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Corrected instantiation
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RPS Duel', // Updated app title
  description: 'A Rock-Paper-Scissors game against the computer.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}> {/* Ensured geistSans is applied via font-sans */}
        {children}
        <Toaster /> {/* Added Toaster */}
      </body>
    </html>
  );
}
