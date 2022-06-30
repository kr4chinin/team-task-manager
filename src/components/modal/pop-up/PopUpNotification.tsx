import './PopUpNotification.css'
import { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface PopUpNotificationProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	handlePopUp: () => void
	title: string
	color?: string
}

const PopUpNotification: FC<PopUpNotificationProps> = ({
	isOpen,
	setIsOpen,
	handlePopUp,
	title,
	color
}) => {
	function handleClose() {
		setIsOpen(false)
	}

	useEffect(() => {
		if (isOpen) {
			handlePopUp()
		}
	}, [isOpen, handlePopUp])

	return createPortal(
		<div className={isOpen ? 'pop-up active' : 'pop-up'}>
			<div
				className={isOpen ? 'pop-up__content active' : 'pop-up__content'}
				onClick={handleClose}
				style={{ backgroundColor: color ? color : 'lightgreen' }}
			>
				<p>{title}</p>
			</div>
		</div>,
		document.getElementById('pop-up-notification-portal')!
	)
}

export default PopUpNotification
