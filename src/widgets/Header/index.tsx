import { Logo, Button, Pusher } from '../../shared/ui'
import style from './index.module.scss'
import { BasketSvg } from '../../shared/assets/'
import { useState } from 'react'
import { Modal } from '../../shared/ui'
import type { Product } from '../../app/App'

type CartItem = {
  id: number
  product: Product
  quantity: number
}

interface propsType {
  count: number
  arrVegetables: CartItem[]
  setOrderItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export default function Header({
  count,
  arrVegetables,
  setOrderItems,
}: propsType) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const increaseQuantity = (id: number, isMin: boolean) => {
    const updatedArr = arrVegetables.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + (isMin ? 1 : -1) }
        : item
    )

    setOrderItems(updatedArr)
  }

  const totalSum = arrVegetables.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  return (
    <div className={style.header}>
      <Logo />
      <Button
        count={count}
        className="whiteCrug"
        label={'Cart'}
        icon={<BasketSvg />}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ul className={style.blockBasket}>
          {arrVegetables.map((item) => (
            <li key={item.id}>
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <p>{item.product.name}</p>
                <div className={style.flex}>
                  <p>$ {item.product.price}</p>
                  <Pusher
                    count={item.quantity}
                    onClickMin={() =>
                      item.quantity > 1 &&
                      increaseQuantity(item.product.id, false)
                    }
                    onClickPlus={() => increaseQuantity(item.product.id, true)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={style.footer}>
          <h2>Total</h2>
          <p>$ {totalSum}</p>
        </div>
      </Modal>
    </div>
  )
}
