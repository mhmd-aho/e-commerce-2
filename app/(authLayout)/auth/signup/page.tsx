"use client"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/schemas/auth";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { useState,useTransition } from "react";
import { useRouter } from "next/navigation";
export default function Signup() {
    const [popUp,setPopUp] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [popUpText,setPopUpText] = useState("")
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })
    const onSubmit = (data: z.infer<typeof signupSchema>) => {
        startTransition(async () => {
        await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            fetchOptions:{
                onSuccess:()=>{
                    setPopUp(true)
                    setPopUpText("Signup successful")
                    setTimeout(() => {
                        setPopUp(false)
                        router.push("/")
                    }, 1000);
                },
                onError:(error)=>{
                    setPopUp(true)
                    setPopUpText(error.error.message)
                    setTimeout(() => {
                        setPopUp(false)
                    }, 1000);
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
                </form>
            </div>
           {
                popUp && (
                    <div className="fixed bottom-5 right-5 w-96 h-20 flex items-center justify-center z-50 bg-white/10 rounded">
                            <h2>{popUpText}</h2>
                    </div>
                )
            }
        </section>
    );
}