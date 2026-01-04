'use client'
import profile from '@/public/assets/icons/icons8-test-account-30.png';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
export function Profile() {
    const router = useRouter()
    const {isAuthenticated,isLoading} = useConvexAuth()
    const  [dropDown, setDropDown] = useState(false)
    const onLogout = () => {
        authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    toast.success("Logout successful")
                    router.push("/")
                },
                onError:(error)=>{
                    toast.error(error.error.message)
                }
            }
        })
        setDropDown(false)
    }
    return (
        <>
            <Image width={30} height={30} src={profile} alt="Profile" onClick={()=>setDropDown(!dropDown)}/>
            {dropDown && (
                !isLoading && (
                    isAuthenticated ?
                    <div onMouseLeave={()=>setDropDown(false)} className="absolute top-10 right-0 w-28 bg-neutral-800 rounded">
                      <button onClick={onLogout} className="block text-start w-full p-2 hover:bg-neutral-900 font-inter text-neutral-400">Logout</button>
                    </div> :
                    <div onMouseLeave={()=>setDropDown(false)} className="absolute top-10 right-0 w-32 bg-neutral-800 rounded">
                      <Link href="/auth/login" className="block p-2 hover:bg-neutral-900 font-inter text-neutral-400">Login</Link>
                      <Link href="/auth/signup" className="block p-2 hover:bg-neutral-900 font-inter text-neutral-400">Signup</Link>
                    </div>
                )
            )}

        </>
    )
}