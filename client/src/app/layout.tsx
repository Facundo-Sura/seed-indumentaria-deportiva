import type { Metadata } from "next";
import "@/styles/globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Seed - Indumentaria Deportiva",
  description: "Indumentria Deportiva, e-commerce, tienda virtual de ropa deportiva",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
