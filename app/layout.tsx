"use client";
import type * as React from "react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AI Readiness Check - 5 Minute Assessment for Small Businesses</title>
        <meta name="description" content="Discover your AI maturity level, identify quick wins, and get a personalized roadmap for leveraging AI in your business." />
      </head>
      <body className={`${fontSans.variable} font-sans antialiased`}>
          {children}
          <Toaster />
          <Sonner />
      </body>
    </html>
  );
}
