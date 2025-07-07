import style from './styles/index.module.scss'
import Header from '../widgets/Header'
import VegetableList from '../widgets/VegetablesList'
import { useEffect, useState } from 'react'
import { Card, Loader } from '../shared/ui'

export interface Product {
  img: string | undefined
  id: number
  name: string
  price: number
  image: string
  category: string
}

type CartItem = {
  id: number
  product: Product
  quantity: number
}

function App() {
  const [byeProd, setArr] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const addSum = (id: number, newItem: Product, kol: number) => {
    const index = byeProd.findIndex((item) => item.id === id)

    if (index !== -1) {
      const updatedArr = byeProd.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + kol } : item
      )
      setArr(updatedArr)
    } else {
      const updatedArr = [
        ...byeProd,
        { id: id, product: newItem, quantity: kol },
      ]
      setArr(updatedArr)
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
        )
        const data: Product[] = await res.json()
        setTimeout(() => {
          setProducts(data)
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error('Ошибка при загрузке:', err)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className={style.main}>
      <Header count={byeProd.length} arrBye={byeProd} setArr={setArr} />

      <VegetableList
        label="Catalog"
        children={
          <div className={style.flex}>
            {loading && <Loader />}
            {products.map((product) => (
              <Card product={product} key={product.id} setSum={addSum} />
            ))}
          </div>
        }
      />
    </div>
  )
}

export default App
