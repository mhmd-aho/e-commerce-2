"use client"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/schemas/auth";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
export default function Signup() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            username: "",
        }
    })
    const onSubmit = (data: z.infer<typeof signupSchema>) => {
        startTransition(async () => {
        await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            username: data.username,
            fetchOptions:{
                onSuccess:()=>{
                    toast.success("Signup successful")
                    router.push("/")
                },
                onError:(error)=>{
                    toast.error(error.error.message)
                }
            }
        })
    })
    }
    return (
         <section className="text-white flex items-center justify-center h-screen">
            <div className="bg-neutral-900 border-2 border-neutral-950/50 p-8 mx-2 rounded-lg shadow-xl w-2xl h-fit flex flex-col sm:gap-4 gap-2">
                <div className="flex flex-col sm:gap-1 ">
                    <h1 className="text-2xl font-bold">Signup</h1>
                    <h3 className="text-neutral-400">Sign up to create an account</h3>  
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:gap-3 gap-2">
                        <Controller
                        control={form.control}
                        name="name" 
                        render={({field, fieldState}) => (
                        <div className="flex flex-col sm:gap-2 gap-0.5">
                            <label htmlFor="name">Name</label>
                            <input placeholder="Mohamad" autoComplete='true' {...field} type="text" id="name" className={`h-12 p-2 border ${fieldState.error ? "border-accent" : "border-neutral-600"} bg-neutral-900 transition-all duration-200 rounded`} />
                            {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                        </div>
                        )}
                        />
                        <Controller
                        control={form.control}
                        name="username" 
                        render={({field, fieldState}) => (
                        <div className="flex flex-col sm:gap-2 gap-0.5">
                            <label htmlFor="username">Username</label>
                            <input placeholder="MohamadAh" autoComplete='true' {...field} type="text" id="username" className={`h-12 p-2 border ${fieldState.error ? "border-accent" : "border-neutral-600"} bg-neutral-900 transition-all duration-200 rounded`} />
                            {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                        </div>
                        )}
                        />
                        <Controller
                        control={form.control}
                        name="email" 
                        render={({field, fieldState}) => (
                        <div className="flex flex-col sm:gap-2 gap-0.5">
                            <label htmlFor="email">Email</label>
                            <input placeholder="Example@gmail.com" autoComplete='true' {...field} type="text" id="email" className={`h-12 p-2 border ${fieldState.error ? "border-accent" : "border-neutral-600"} bg-neutral-900 transition-all duration-200 rounded`} />
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
                        <input placeholder="Example123@" autoComplete='true' type="password" {...field} id="password" className={`h-12 p-2 border ${fieldState.error ? "border-accent" : "border-neutral-600"} bg-neutral-900 transition-all duration-200 rounded`} />
                        {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                    </div>
                    )}
                    />
                    <button disabled={isPending} type="submit" className="bg-white/80 hover:bg-white/60 transition-all duration-200 text-black h-12 rounded-lg sm:mt-4 mt-2">{isPending ? "Loading..." : "Signup"}</button>
                    <Link href="/auth/login" className="text-neutral-400 hover:text-white transition-all duration-200">Already have an account? Login</Link>
                </form>
            </div>
        </section>
    );
}