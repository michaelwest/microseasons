import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Microseasons Sydney",
  description: "A Sydney microseasons companion with collaborative notes and seasonality checks.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
