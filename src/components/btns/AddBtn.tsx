import { FC } from 'react'
import cl from './styles/AddButton.module.css'

interface AddBtnProps {
	title: string
	onClick: () => void
}

const AddBtn: FC<AddBtnProps> = ({ title, onClick }) => {
	return <button onClick={onClick} className={cl['add-btn']}>{title}</button>
}

export default AddBtn
