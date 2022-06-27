import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useModalsContext } from '../../../context/ModalsContext'
import { calculateTasks } from '../../../helpers/calculateTasks'
import { IUser } from '../../../interfaces'
import ActionBtn from '../../btns/ActionBtn'
import './OpenUserModal.css'

interface OpenUserModalProps {
	user: IUser
	numberOfTasks: number
	numberOfCompletedTasks: number
    users: IUser[]
    setUsers: (users: IUser[]) => void

}

const OpenUserModal: FC<OpenUserModalProps> = ({
	user,
	numberOfCompletedTasks,
	numberOfTasks,
    users,
    setUsers
}) => {
	const { isUserOpen, setIsUserOpen } = useModalsContext()

	const navigate = useNavigate()

	function handlePropagation(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
	}

	function handleClose() {
		setIsUserOpen(false)
	}

	let completedTasksColor = calculateTasks(
		numberOfCompletedTasks,
		numberOfTasks
	)

    function handleDelete() {
        setUsers(users.filter(u =>
            u.id !== user.id
        ))
    }

	return createPortal(
		<div
			className={isUserOpen ? 'open-user__modal active' : 'open-user__modal'}
			onClick={handleClose}
		>
			<div className="content-and-btns">
				<div
					className={
						isUserOpen
							? 'open-user__modal-content active'
							: 'open-user__modal-content'
					}
					onClick={handlePropagation}
				>
					<img
						id="user-avatar"
						alt="User avatar"
						src={user ? `https://picsum.photos/id/${user.id + 10}/200` : ''}
					/>
					<div className="user-info-container">
						<div>
							<p id="user-name">{user?.name}</p>
							<p id="user-email">e-mail: {user?.email}</p>
						</div>
						<div className="user-tasks-info-container">
							<p id="user-tasks">💻 Tasks: {numberOfTasks}</p>
							<p id="user-completed-tasks">
								Completed:{' '}
								<span id={completedTasksColor}>{numberOfCompletedTasks}</span>
							</p>
						</div>
					</div>
					<p id="close-cross" onClick={handleClose}>
						❌
					</p>
				</div>
				<div className="btns-container">
					<ActionBtn
						title="Edit user"
						color="#F7A400"
						width="244px"
						onClick={() => console.log(1)}
					/>
					<ActionBtn
						title="Open tasks"
						color="#3A9EFD"
						width="254px"
						onClick={() => navigate(`/user-tasks/${user.id}`)}
					/>
					<ActionBtn
						title="Delete user"
						color="#B43873"
						width="263px"
						onClick={handleDelete}
					/>
				</div>
			</div>
		</div>,
		document.getElementById('open-user-portal')!
	)
}

export default OpenUserModal
