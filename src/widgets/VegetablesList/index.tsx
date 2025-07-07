import style from './index.module.scss'

interface VegetableListProps {
  label: string
  children: React.ReactNode
}

export default function VegetableList({ label, children }: VegetableListProps) {
  return (
    <div className={style.section}>
      <h2>{label}</h2>
      {children}
    </div>
  )
}
