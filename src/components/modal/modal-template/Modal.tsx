import { FC } from 'react'
import './Modal.css'

interface ModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	children: React.ReactNode
	setIsEditing?: (isEditing: boolean) => void
}

const Modal: FC<ModalProps> = ({
	isOpen,
	setIsOpen,
	children,
	setIsEditing
}) => {
	function handleClose() {
		setIsOpen(false)
		if (setIsEditing) {
			setIsEditing(false)
		}
	}

	return (
		<div className={isOpen ? 'modal active' : 'modal'} onClick={handleClose}>
			{children}
		</div>
	)
}

export default Modal
