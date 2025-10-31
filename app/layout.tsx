import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gadget Fixa",
  description:
    "A modern platform connecting customers with skilled artisans for gadget repairs and maintenance services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {" "}
        <SidebarProvider>
          <Providers>
            {" "}
            <Header />
            {children}
          </Providers>
        </SidebarProvider>
      </body>
    </html>
  );
}
