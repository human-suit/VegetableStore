import style from './index.module.scss'
import type { Product } from '../../types/'
import { Button, Pusher } from '../'
import { useState, useEffect } from 'react'

type Props = {
  product: Product
  quantity: number
  setSum: (id: number, newItem: Product, count: number) => void
}

export default function Card({ product, quantity, setSum }: Props) {
  const [count, setCount] = useState(quantity)

  useEffect(() => {
    setCount(quantity)
  }, [quantity])

  return (
    <div className={style.main}>
      <img src={product.image} alt={product.name} />
      <div className={style.row}>
        <h3>{product.name}</h3>
        <Pusher
          count={count}
          onClickMin={() => count > 1 && setCount(count - 1)}
          onClickPlus={() => setCount(count + 1)}
        />
      </div>
      <div className={style.row}>
        <p>$ {product.price}</p>
        <Button
          label="Add to cart"
          className={`butGreen`}
          onClick={() => setSum(product.id, product, count)}
        />
      </div>
    </div>
  )
}
