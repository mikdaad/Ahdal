import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { getServerSession } from "next-auth";
import { options } from "../lib/auth";
import Provider from "../components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ahdal Steel Doors & Windows",
  description: "A design-driven brand committed to redefining modern architecture with premium steel and window solutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen font-['Blauer_Nue'] `} 
       >
        <Provider session={session}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        </Provider>
        
       
        
        {/* Content Section */}
        <main className=""> {/* Padding top ensures content does not overlap with fixed header */}
          {children}
        </main>
      </body>
    </html>
  );
}