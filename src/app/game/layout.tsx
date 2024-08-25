import type { Metadata } from "next";
import styles from "./page.module.css"

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
    <div className={styles.body_game} style={{}}>{children}</div>
  );
}
