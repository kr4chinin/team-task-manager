import { FC } from 'react'
import cl from './styles/AddButton.module.css'

interface AddBtnProps {
	title: string
}

const AddBtn: FC<AddBtnProps> = ({ title }) => {
	return <button className={cl['add-btn']}>{title}</button>
}

export default AddBtn
