import {z} from 'zod';
import validator from "validator";


export const createAccountSchema = z.object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    email: z.string().email("Please provide a valid email address"),
    phone_number: z.string().refine(validator.isMobilePhone),
    gender: z.enum(["OTHER","MALE", "FEMALE"]),
    password: z.string().min(6, "Password should be atleast 6 characters long").max(24, "Password should be a maximum of 24 characters"),
    confirm_password: z.string()
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});





export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
 
});




















