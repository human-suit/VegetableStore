import { Logo, Button, Pusher } from '../../shared/ui'
import style from './index.module.scss'
import { BasketSvg } from '../../shared/assets/'
import { useState } from 'react'
import { Modal } from '../../shared/ui'
import type { propsType } from '../../shared/types/'

export default function Header({
  count,
  arrVegetables,
  setOrderItems,
}: propsType) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const increaseQuantity = (id: number, increment: boolean) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
            }
          : item
      )
    )
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
