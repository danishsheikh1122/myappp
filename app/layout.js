import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wellness360",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider dynamic>
    <html lang="en">
      <body className={inter.className}>
      <GoogleOAuthProvider clientId='612223079143-al5fk3306vsbe5pauhoa65p933884492.apps.googleusercontent.com'>
        <Header />
        {children}
      </GoogleOAuthProvider>
      </body>
    </html>
 </ClerkProvider>
  );
}
