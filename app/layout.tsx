import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Bounce, ToastContainer } from "react-toastify";
import { ContextProvider } from "@/app/context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Nike e-commerce",
  description: "Nike e-commerce clone for educational purposes",
  authors: [{ name: "Mohamad abou hamoud" }],
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${orbitron.variable} antialiased `}
      >
        <ConvexClientProvider>
          <ContextProvider>
            {children}
          </ContextProvider>
        </ConvexClientProvider>
        <ToastContainer position="bottom-right"  
        theme="colored" transition={Bounce} closeOnClick pauseOnFocusLoss draggable pauseOnHover/>
      </body>
    </html>
  );
}
