import { Logo, Button, Pusher } from '../../shared/ui'
import style from './index.module.scss'
import { BasketSvg } from '../../shared/assets/'
import { useEffect, useState } from 'react'
import { Modal } from '../../shared/ui'
import type { Product } from '../../app/App'
// import shop from '../../shared/assets/'

type CartItem = {
  id: number
  product: Product
  quantity: number
}

interface propsType {
  count: number
  arrBye: CartItem[]
  setArr: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export default function Header({ count, arrBye, setArr }: propsType) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [sum, setSum] = useState<number>(0)

  const increaseQuantity = (id: number, isMin: boolean) => {
    let updatedArr
    if (isMin) {
      updatedArr = arrBye.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      updatedArr = arrBye.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + -1 } : item
      )
    }

    setArr(updatedArr)
  }

  useEffect(() => {
    const total = arrBye.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
    setSum(total)
  }, [arrBye])

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
          {arrBye.map((item) => (
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
          <p>$ {sum}</p>
        </div>
      </Modal>
    </div>
  )
}
