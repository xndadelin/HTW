'use client'

import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";
import { ClientProvider } from '@/components/providers/QueryClientProvider';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useGetUser from "@/lib/useGetUser";
import WaveLoading from "@/components/auth/Loading";
import Link from "next/link";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useGetUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        {loading ? (
          <WaveLoading />
        ) : (
          <ClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {!user && <Navbar />}
              {user ? (
                <SidebarProvider>
                  <AppSidebar />
                  <div className="flex gap-2 p-4">
                    <SidebarTrigger />
                  </div>
                  <ModeToggle />
                  {children}
                </SidebarProvider>
              ) : (
                <>
                  <ModeToggle />
                  {children}
                </>
              )}
              <Toaster />
            </ThemeProvider>
          </ClientProvider>
        )}
      </body>
    </html>
  );
}