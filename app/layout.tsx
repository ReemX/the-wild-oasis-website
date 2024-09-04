import "./_styles/globals.css";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import { AuthProvider } from "./_components/AuthContext";
import { SessionProvider } from "next-auth/react";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <SessionProvider>
          <AuthProvider>
            <ReservationProvider>
              <Header />
              <div className="grid flex-1 px-8 py-12">
                <main className="mx-auto w-full max-w-7xl">{children}</main>
              </div>
            </ReservationProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
