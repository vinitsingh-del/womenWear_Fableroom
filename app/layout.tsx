import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FableRoom Women - Fashion & Lifestyle",
  description: "Shop FableRoom leather handbags, demi-fine jewellery and cashmere-merino scarves.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
