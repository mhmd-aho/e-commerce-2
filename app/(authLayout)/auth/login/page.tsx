"use client"
import { useForm,Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schemas/auth";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState,useTransition } from "react";

export default function Login() {
    const [popUpText,setPopUpText] = useState<string>("");
    const [isPending, startTransition] = useTransition();
    const [popUp,setPopUp] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        startTransition(async () => {
        await authClient.signIn.email({
            email: data.email,
            password: data.password,
            fetchOptions:{
                onSuccess:()=>{
                    setPopUpText("Login successful");
                    setPopUp(true);
                    setTimeout(() => {
                        router.push("/")
                        setPopUp(false)
                    }, 1000);
                },
                onError:(error)=>{
                    setPopUpText(error.error.message);
                    setPopUp(true);
                    setTimeout(() => {
                        setPopUp(false)
                    }, 1000);
                }
            }
        })
    })
    }
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
                    name="email" 
                    render={({field, fieldState}) => (
                    <div className="flex flex-col sm:gap-2 gap-0.5">
                        <label htmlFor="email">Email</label>
                        <input placeholder="Example@gmail.com" autoComplete='true' {...field} type="text" name="email" id="email" className={`h-12 p-2 border ${fieldState.error ? "border-accent" : "border-neutral-600"} bg-neutral-900 transition-all duration-200 rounded`} />
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
            {
                popUp &&
                    <div className="fixed bottom-5 right-5 w-96 h-20 flex items-center justify-center z-50 bg-neutral-800 rounded">
                        <div onClick={()=>setPopUp(false)} className="absolute -top-2 left-2 h-5 w-5 bg-neutral-800 rounded-full flex justify-center items-center overflow-hidden border border-black">
                            <button  className='text-sm text-neutral-400'>x</button>
                        </div>
                        <h3>{popUpText}</h3>
                    </div>
            }   
        </section>
    )
}