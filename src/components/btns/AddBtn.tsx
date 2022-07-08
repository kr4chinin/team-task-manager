import { FC } from 'react'
import cl from './styles/AddButton.module.css'

interface AddBtnProps {
	title: string
	onClick: () => void
	disabled?: boolean
}

const AddBtn: FC<AddBtnProps> = ({ title, onClick, disabled }) => {
	return (
		<button
			disabled={disabled ? disabled : false}
			onClick={onClick}
			className={cl['add-btn']}
		>
			{title}
		</button>
	)
}

export default AddBtn
