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



const COLOR_MAP: Record<string, { name: string; css: string }> = {
  white: { name: 'White', css: '#ffffff' },
  blue: { name: 'Blue', css: '#2563eb' },
  beige: { name: 'Beige', css: '#f7f7ad' },
  black: { name: 'Black', css: '#000000' },
  pink: { name: 'Pink', css: '#f280bc' },
  babyblue: { name: 'Baby Blue', css: '#89cff0' },
  yellow: { name: 'Yellow', css: '#facc15' },
  purple: { name: 'Purple', css: '#9333ea' },
  orange: { name: 'Orange', css: '#fb923c' },
  silver: { name: 'Silver', css: '#c0c0c0' },
  red: { name: 'Red', css: '#dc2626' },
  green: { name: 'Green', css: '#17bf55' },
  gray: { name: 'Gray', css: '#6b7280' },
  neongreen: { name: 'Neon Green', css: '#39ff14' },
}

export const colors = Object.values(COLOR_MAP)
export const getColor = (color: string) => COLOR_MAP[color]?.css || color
export const resortColor = (css:string) => {
  const color = Object.values(COLOR_MAP).find((color) => color.css === css)
  return color?.name || css
}

export const getColorKey = (css: string) => {
  const colorKey = Object.keys(COLOR_MAP).find(key => COLOR_MAP[key].css === css);
  return colorKey || css;
}


