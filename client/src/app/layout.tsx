
import authenticated from "@/lib/authenticated";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
export const metadata: Metadata = {
  title: "Digital Repository",
  description: "Immutability",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isAuth = authenticated()
  const headersList = headers();
  // const pathname = headersList.get("x-current-path") || "";

  return (
    <html lang="en">
      
      <body className={cn(
          "min-h-screen relative  font-sans antialiased bg-white dark:bg-gray-900 max-w-full",
          fontSans.variable,
        )}>
          
          
          
              <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
              
                {children}
              
              </div>
            
          </body>
          
    </html>
  );
}
