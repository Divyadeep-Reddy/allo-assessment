import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Allo Inventory System",
  description: "Inventory reservation management system",

  openGraph: {
    title: "Allo Inventory System",
    description: "Inventory reservation management system",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}