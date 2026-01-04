"use client"
import { motion } from 'motion/react'
interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
}
const buttonVariants ={
    whileTap:{ 
        scale: 0.9,
        y:1,
        opacity: 0.5,
        transition:{type:'spring',stiffness:300,damping:13}
    },
    whileHover:{ 
        scale: 1.05,
        y:-2 ,
        opacity: 0.8,
        transition:{type:'spring',stiffness:300,damping:13}
    },
}
export default function Button({children, onClick,disabled}: ButtonProps) {
    return (
        <motion.button variants={buttonVariants} whileTap="whileTap" whileHover="whileHover" className='font-inter font-medium w-full shadow-lg bg-accent text-white py-2 px-4 rounded-lg' onClick={onClick} disabled={disabled}>
            {children}
        </motion.button>
    )
}