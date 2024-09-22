import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";
import { ClientProvider } from '@/components/providers/QueryClientProvider';
import { Poppins } from 'next/font/google'


export const metadata: Metadata = {
  title: "Hack The Way",
  description: "Hack The Way is a community of cybersecurity enthusiasts."
};

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <ModeToggle />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
