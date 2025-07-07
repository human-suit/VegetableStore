import style from './index.module.scss'
import { Loading } from '../../assets/'
import load from '../../assets/loader.png'

export default function Loader() {
  const fakeArray = Array.from({ length: 8 })

  return (
    <div className={style.main}>
      {fakeArray.map((_, index) => (
        <div className={style.flex} key={index}>
          <img src={load} alt="Loading..." />
          <Loading />
        </div>
      ))}
    </div>
  )
}
