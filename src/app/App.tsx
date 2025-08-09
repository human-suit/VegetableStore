import style from './styles/index.module.scss'
import Header from '../widgets/Header'
import { useEffect, useState } from 'react'
import { Card, Loader } from '../shared/ui'

import type { Product, CartItem } from '../shared/types'

function App() {
  const [orderItems, setOrderItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const addSum = (id: number, newItem: Product, kol: number) => {
    const index = orderItems.findIndex((item) => item.id === id)

    if (index !== -1) {
      const updatedArr = orderItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + kol } : item
      )
      setOrderItems(updatedArr)
    } else {
      setOrderItems([...orderItems, { id, product: newItem, quantity: kol }])
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
      <Header
        count={orderItems.length}
        arrVegetables={orderItems}
        setOrderItems={setOrderItems}
      />

      <section className={style.section}>
        <h2>Catalog</h2>
        <div className={style.flex}>
          {loading && <Loader />}
          {!loading &&
            products.map((product) => {
              const cartItem = orderItems.find((item) => item.id === product.id)
              const quantity = cartItem ? cartItem.quantity : 1

              return (
                <Card
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  setSum={addSum}
                />
              )
            })}
        </div>
      </section>
    </div>
  )
}

export default App
