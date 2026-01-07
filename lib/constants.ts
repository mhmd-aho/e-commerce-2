export interface Shoe {
  name: string
  description: string
  colors: string[]
  price: number
  gender: string
  imageUrl?: string
  _id: string
  authorId?: string
}

export interface CartItem extends Shoe {
  quantity: number
  size: number
  name: string
  price: number
}



const COLOR_MAP: Record<string, { key: string; name: string; css: string }> = {
  white: {key:'white', name: 'White', css: '#ffffff' },
  blue: { key:'blue', name: 'Blue', css: '#2563eb' },
  beige: { key:'beige', name: 'Beige', css: '#f7f7ad' },
  black: { key:'black', name: 'Black', css: '#000000' },
  pink: { key:'pink', name: 'Pink', css: '#f280bc' },
  babyblue: { key:'babyblue', name: 'Baby Blue', css: '#89cff0' },
  yellow: { key:'yellow', name: 'Yellow', css: '#facc15' },
  purple: { key:'purple', name: 'Purple', css: '#9333ea' },
  orange: { key:'orange', name: 'Orange', css: '#fb923c' },
  silver: { key:'silver', name: 'Silver', css: '#c0c0c0' },
  red: { key:'red', name: 'Red', css: '#dc2626' },
  green: { key:'green', name: 'Green', css: '#17bf55' },
  gray: { key:'gray', name: 'Gray', css: '#6b7280' },
  neongreen: { key:'neongreen', name: 'Neon Green', css: '#39ff14' },
}
export const PopupVariants = {
    hidden:{
        opacity:0,
        y:-500
    },
    visible:{
        opacity:1,
        y:0
    }
}
export const buttonVariants ={
    whileTap:{ 
        scale: 0.9,
        y:1,
        opacity: 0.5,
        transition:{type:'spring' as const,stiffness:300,damping:13}
    },
    whileHover:{ 
        scale: 1.05,
        y:-2 ,
        opacity: 0.8,
        transition:{type:'spring' as const,stiffness:300,damping:13}
    },
}
export const colors = Object.values(COLOR_MAP)
export const getColor = (color: string) => COLOR_MAP[color]?.css || color
