"use server"


import { get, post } from "@/lib/fetch";
import { redirect } from "next/navigation";
import { createAccountSchema } from "@/lib/schema";
import { z } from "zod";

import { cookies } from "next/headers";


export default async function createUser(data: z.infer<typeof createAccountSchema>){
  const { error } = await post("auth/register/", data);

  if(error){
    return { error }
  } 

  const exp = Date.now() + (24 * 60 * 60 * 100)
  const cookieStore = await cookies()
 

  redirect("/auth/login")

}


