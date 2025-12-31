'use client'
import profile from '@/public/assets/icons/icons8-test-account-30.png';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
export function Profile() {
    const router = useRouter()
    const {isAuthenticated,isLoading} = useConvexAuth()
    const  [dropDown, setDropDown] = useState(false)
    const [popUp,setPopUp] = useState(false)
    const [popUpText,setPopUpText] = useState("")
    const onLogout = () => {
        authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    setPopUp(true)
                    setPopUpText("Logout successful")
                    router.push("/")
                },
                onError:(error)=>{
                    setPopUp(true)
                    setPopUpText(error.error.message)
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
            {
                popUp &&
                    <div className="fixed bottom-5 right-5 w-96 h-20 flex items-center justify-center z-50 bg-neutral-800 rounded">
                        <div onClick={()=>setPopUp(false)} className="absolute -top-2 left-2 h-5 w-5 bg-neutral-800 rounded-full flex justify-center items-center overflow-hidden border border-black">
                            <button  className='text-sm text-neutral-400'>x</button>
                        </div>
                        <h3>{popUpText}</h3>
                    </div>
            }

        </>
    )
}