import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./page.module.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "摩天楼",
  description: "タワー探索型RPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={styles.body_style}>{children}</body>
    </html>
  );
}
