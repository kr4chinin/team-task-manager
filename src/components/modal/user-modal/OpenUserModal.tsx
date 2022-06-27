import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import { useModalsContext } from '../../../context/ModalsContext'
import './OpenUserModal.css'

interface OpenUserModalProps {
    id: number
}

const OpenUserModal: FC<OpenUserModalProps> = ({id}) => {
	const { isUserOpen, setIsUserOpen } = useModalsContext()

	function handlePropagation(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
	}

	function handleClose() {
		setIsUserOpen(false)
	}

	return createPortal(
		<div
			className={isUserOpen ? 'open-user__modal active' : 'open-user__modal'}
			onClick={handleClose}
		>
			<div
				className={
					isUserOpen
						? 'open-user__modal-content active'
						: 'open-user__modal-content'
				}
				onClick={handlePropagation}
			>
				<img className='user-avatar' src={`https://picsum.photos/id/${id + 10}/200`} />
			</div>
		</div>,
		document.getElementById('open-user-portal')!
	)
}

export default OpenUserModal
