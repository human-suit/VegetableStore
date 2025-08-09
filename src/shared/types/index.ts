export type Product = {
  img: string | undefined
  id: number
  name: string
  price: number
  image: string
  category: string
}

export type CartItem = {
  id: number
  product: Product
  quantity: number
}

export type propsType = {
  count: number
  arrVegetables: CartItem[]
  setOrderItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}
