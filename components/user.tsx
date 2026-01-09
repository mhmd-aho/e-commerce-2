'use client'
import profile from '@/public/assets/icons/icons8-test-account-30.png';
import Image from 'next/image';
import Link from 'next/link';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useContexts } from '@/app/context/useContext';
export function Profile() {
    const {setFavOpen,setCartOpen,userOpen,setUserOpen,setNavOpen,setShoe,setSearchOpen} = useContexts()
    const router = useRouter()
    const {isAuthenticated,isLoading} = useConvexAuth()
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
        setUserOpen(false)
    }
    return (
        <>
            <button onClick={()=>{
                setUserOpen(!userOpen)
                if(!userOpen){
                    setCartOpen(false)
                    setFavOpen(false)
                    setShoe("")
                    setNavOpen(false)
                    setSearchOpen(false)
                }
            }} className="relative sm:size-8 size-6 mr-5 lg:mr-0">
                <Image fill src={profile} alt="Profile" />
            </button>
            {userOpen && (
                !isLoading && (
                    isAuthenticated ?
                    <div className="absolute top-10 right-1 w-28 bg-neutral-800 rounded">
                      <button onClick={onLogout} className="block text-start w-full p-2 hover:bg-neutral-900 font-inter text-neutral-400">Logout</button>
                    </div> :
                    <div className="absolute top-10 right-1 w-32 bg-neutral-800 rounded">
                      <Link href="/auth/login" className="block p-2 hover:bg-neutral-900 font-inter text-neutral-400">Login</Link>
                      <Link href="/auth/signup" className="block p-2 hover:bg-neutral-900 font-inter text-neutral-400">Signup</Link>
                    </div>
                )
            )}

        </>
    )
}