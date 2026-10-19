import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "wizzdom — Give AI the full picture",
  description: "Connect your history with what you are doing now.",
  icons: {
    icon: "/assets/brand/wizzdom-lens.png",
    shortcut: "/assets/brand/wizzdom-lens.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
