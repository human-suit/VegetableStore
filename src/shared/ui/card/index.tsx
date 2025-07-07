import style from './index.module.scss'
import type { Product } from '../../../app/App'
import { Button, Pusher } from '../'
import { useState } from 'react'

type Props = {
  product: Product
  setSum: (id: number, newItem: Product, count: number) => void
}

export default function Card({ product, setSum }: Props) {
  const [count, setCount] = useState(1)

  return (
    <div className={style.main} key={product.id}>
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
          label="Add to card"
          className={`butGreen`}
          onClick={() => {
            setSum(product.id, product, count)
          }}
        />
      </div>
    </div>
  )
}
