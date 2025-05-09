"use client"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useEffect, useState, useTransition } from "react";



import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Input as ShadIput } from "@/components/ui/input";
import { createAccountSchema, LoginSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import createAccount from "../register";
import { useSearchParams } from "next/navigation";
import CardWrapper from "@/components/common/card-wrapper";
import Link from "next/link";

import { cn } from "@/lib/utils";




export default function RegisterForm() {

      const searchParams = useSearchParams();
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState("");
      const [isPending, startTransition] = useTransition();
      const [countries, setCountries] = useState([]);
      const [selectedCountry, setSelectedCountry] = useState<{value: string, label: string} | null>(null);


      const form = useForm<z.infer<typeof createAccountSchema>>({
          resolver: zodResolver(createAccountSchema),
          defaultValues: {
              first_name: "",
              last_name: "",
              email: "",
              user_role: "CUSTOMER",
              password: "",
              confirm_password: "",
              
          },
      });


      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof createAccountSchema>) {
        setError("");
        setSuccess("");
        console.log("posting form data: ", values)
        startTransition(async () => {

        

            createAccount(values).then((data) => {
            if (data?.error) {
              
              if(typeof data.error === "object"){
                if(data.error?.email){
                  form.setError("email", { type: 'custom', message: data.error?.email[0] })
                }
            
                if(data.error?.first_name){
                  form.setError("first_name", { type: 'custom', message: data.error?.first_name[0] })
                }

                if(data.error?.last_name){
                  form.setError("last_name", { type: 'custom', message: data.error?.last_name[0] })
                }


                

                if(data.error?.password){
                  form.setError("password", { type: 'custom', message: data.error?.password[0] })
                }

                if(data.error?.confirm_password){
                  form.setError("confirm_password", { type: 'custom', message: data.error?.confirm_password[0] })
                }
                
              } else {
                setError(data.error);
              }
            }
  
            // if (data?.success) {
            //   form.reset();
            //   setSuccess(data.success);
            // }
  
            // if (data?.twoFactor) {
            //   setShowTwoFactor(true);
            // }
          }).catch(() => setError(""));

        })
      }

     

    return (
      <>
          <CardWrapper title="Create an account">
          
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  <div className="mt-1">

                  <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input disabled={isPending}
                                  type="first_name"  placeholder="John" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                   
                  </div>


                  <div className="mt-1">

                  <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input disabled={isPending}
                                  type="last_name"  placeholder="Doe" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                   
                  </div>


                  <div className="mt-1">

                  <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={isPending}
                                  type="email" autoComplete="email" placeholder="johndoe@example.com" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                   
                  </div>

                  <div className="mt-1">
                        
                       

                        

                  </div>


                  


                  <div className="flex flex-col space-y-1.5">

                    

                    
                    </div>

                  <div className="flex flex-col space-y-1.5">
                  <FormField
          control={form.control}
          name="user_role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CUSTOMER">
                  <div className="flex items-center gap-4 justify-between">
                        <span>Customer</span>
                     </div>
                    
                    </SelectItem>
                  <SelectItem value="COMPANY">
                    <div className="flex items-center gap-4 justify-between">
                        <span>Company</span>
                     </div>
                    </SelectItem>
                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
                  </div>
  
                  <div className="mt-1">
                    <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                  <Input disabled={isPending}  type="password" autoComplete="password" placeholder="Password" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                    
                    </div>



                    <div className="mt-1">
                    <FormField
                          control={form.control}
                          name="confirm_password"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                  <Input disabled={isPending}  type="password" autoComplete="password" placeholder="Confirm password" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                    
                    </div>


                   
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm">
                    <Link href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>


                <FormError message={error} />

                <FormSuccess message={success} />

                <div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full text-white dark:text-gray-900"
                  >
                   Signup
                  </Button>
                </div>
              </form>
              </Form>
  
              
           
          </CardWrapper>
          {/* <SignIn /> */}
      </>
    )
  }

  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };
  