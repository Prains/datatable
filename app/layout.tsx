import "primereact/resources/themes/lara-light-cyan/theme.css";
import type { Metadata } from "next";
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";

export const metadata: Metadata = {
  title: "DataTable Test Task",
  description: "Тестовое задание, дататейбл",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-slate-500">
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
