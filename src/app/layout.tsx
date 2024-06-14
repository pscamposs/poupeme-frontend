"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/services/queryClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <div>
            <Navbar />
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
