"use client"
import { useForm,Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schemas/auth";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {toast} from "react-toastify"

export default function Login() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            usernameOrEmail: "",
            password: "",
        }
    })
const onSubmit = (data: z.infer<typeof loginSchema>) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(data.usernameOrEmail.trim());

  startTransition(async () => {
    if (isEmail) {
      await authClient.signIn.email({
        email: data.usernameOrEmail.trim(),
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login successful");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    } else {
      await authClient.signIn.username({
        username: data.usernameOrEmail.trim(),
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login successful");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    }
  });
};

    
    return(
        <section className="text-white flex items-center justify-center h-screen">
            <div className="bg-neutral-900 border-2 border-neutral-950/50 p-8 mx-2 rounded-lg shadow-xl w-2xl h-fit flex flex-col sm:gap-4 gap-2">
                <div className="flex flex-col sm:gap-1">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <h3 className="text-neutral-400">Login to your account</h3>  
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:gap-3 gap-2">
                    <Controller
                    control={form.control}
                    name="usernameOrEmail" 
                    render={({field, fieldState}) => (
                    <div className="flex flex-col sm:gap-2 gap-0.5">
                        <label htmlFor="usernameOrEmail">Username or Email</label>
                        <input placeholder="Username or Email" autoComplete='true' {...field} type="text" name="usernameOrEmail" id="usernameOrEmail" className={`h-12 p-2 border ${fieldState.error ? "border-accent" : "border-neutral-600"} bg-neutral-900 transition-all duration-200 rounded`} />
                        {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                    </div>
                    )}
                    />
                    <Controller
                    control={form.control}
                    name="password" 
                    render={({field, fieldState}) => (
                    <div className="flex flex-col sm:gap-2 gap-0.5">
                        <label htmlFor="password">Password</label>
                        <input placeholder="Example123@" autoComplete='true' type="password" {...field} name="password" id="password" className={`h-12 p-2 border ${fieldState.error ? "border-accent" : "border-neutral-600"} bg-neutral-900 transition-all duration-200 rounded`} />
                        {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                    </div>
                    )}
                    />
                    <button disabled={isPending} type="submit" className="bg-white/80 hover:bg-white/60 transition-all duration-200 text-black h-12 rounded-lg sm:mt-4 mt-2">{isPending ? "Loading..." : "Login"}</button>
                </form>
            </div> 
        </section>
    )
}