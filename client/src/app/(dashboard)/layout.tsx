import { User } from "@/interface/user.interface";
import { getUserConfig } from "@/lib/account";
import authenticated from "@/lib/authenticated";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";




const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Car managemet",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // check if the user is authenticated
  const isAuth = await authenticated()

  if(isAuth){
    const userConfig = await getUserConfig<User>()
    console.log({userConfig})
    
  } 

  return (
        <>{children}</>     
  );
}
