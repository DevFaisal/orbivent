import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orbivent - Simplify Your Event Management",
  description:
    "Create, manage, and attend events effortlessly with Orbivent's intuitive platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
        
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
