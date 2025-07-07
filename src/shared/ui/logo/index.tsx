import style from './index.module.scss'

export default function Logo() {
  return (
    <a href="/" className={style.logo}>
      <p>Vegetable</p>
      <div className={style.grenBack}>Shop</div>
    </a>
  )
}
