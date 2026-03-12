import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Amazon Clone Assignment",
  description: "Amazon clone Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{ style: { background: "#000000", color: "#ffffff" } }}
        />
      </body>
    </html>
  );
}
