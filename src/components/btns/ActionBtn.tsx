import { FC } from 'react'
import cl from './styles/ActionBtn.module.css'

interface ActionBtnProps {
	title: string
	color: string
	onClick: () => void
	width: string
}

const ActionBtn: FC<ActionBtnProps> = ({ title, color, width, onClick }) => {
	return (
		<button
			className={cl['action-btn']}
			style={{ backgroundColor: color, width: width }}
			onClick={onClick}
		>
			{title}
		</button>
	)
}

export default ActionBtn
