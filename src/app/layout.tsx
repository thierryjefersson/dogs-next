import type { Metadata } from "next";
import "./globals.css";
import { font_secundary } from "./fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { UserContextProvider } from "@/context/user-context";
import userGet from "@/actions/user-get";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros.",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const { data: user } = await userGet();

  return (
    <html lang="pt-BR" className={`${font_secundary.variable}`}>
      <body className="pt-16 font-primary text-default-txt-color">
        <UserContextProvider user={user}>
          <div className="flex min-h-[calc(100vh+10rem)] flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <div>{modal}</div>
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
