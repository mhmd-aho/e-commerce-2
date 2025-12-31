
interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
}

export default function Button({children, onClick,disabled}: ButtonProps) {
    return (
        <button className='font-inter font-medium w-full shadow-lg bg-accent text-white py-2 px-4 rounded-lg' onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}