import type { Metadata } from "next";
import "./main.scss";
import Header from "../components/UI/header/header";

export const metadata: Metadata = {
  title: "Evapps - блог о путешествиях",
  description: "Evapps - приложение, где Вы можете поделиться своими историями путешествий, а также узнать о новых местах",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
