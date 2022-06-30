import React, { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useModalContext } from '../../../context/ModalContext'
import { calculateTasks } from '../../../helpers/calculateTasks'
import { saveWithEnter } from '../../../helpers/saveWithEnter'
import { useEscape } from '../../../hooks/useEscape'
import { IUser } from '../../../interfaces'
import ActionBtn from '../../btns/ActionBtn'
import Modal from '../modal-template/Modal'
import './styles/UserModal.css'

interface UserModalProps {
	user: IUser
	numberOfTasks: number
	numberOfCompletedTasks: number
	users: IUser[]
	setUsers: (users: IUser[]) => void
}

const UserModal: FC<UserModalProps> = ({
	user,
	numberOfCompletedTasks,
	numberOfTasks,
	users,
	setUsers
}) => {
	let completedTasksColor = calculateTasks(
		numberOfCompletedTasks,
		numberOfTasks
	)

	const { isUserOpen, setIsUserOpen } = useModalContext()
	const [isEditing, setIsEditing] = useState(false)
	const [editedData, setEditedData] = useState({
		name: user?.name,
		email: user?.email
	})

	useEffect(
		() =>
			setEditedData({
				name: user?.name,
				email: user?.email
			}),
		[user]
	)

	const navigate = useNavigate()

	function handlePropagation(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
	}

	function handleDelete() {
		setUsers(users.filter(u => u.id !== user.id))
		setIsUserOpen(false)
	}

	function handleClose() {
		setIsUserOpen(false)
		setIsEditing(false)
	}

	function handleOpenTasks() {
		navigate(`/user-tasks/${user.id}`)
		setIsUserOpen(false)
	}

	function handleBtnClick(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
	}

	function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEditedData({ ...editedData, name: e.target.value })
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEditedData({ ...editedData, email: e.target.value })
	}

	function handleSave() {
		let editedUser: IUser = user

		editedUser.name = editedData.name
		editedUser.email = editedData.email

		setUsers([...users.filter(u => u.id !== user.id), editedUser])
		setIsUserOpen(false)
	}

	function handleCancel() {
		setIsEditing(false)
		setEditedData({
			name: user?.name,
			email: user?.email
		})
	}

	useEscape(setIsUserOpen)

	return createPortal(
		<Modal
			isOpen={isUserOpen}
			setIsOpen={setIsUserOpen}
			setIsEditing={setIsEditing}
		>
			<div
				className="content-and-btns"
				onKeyDown={e => saveWithEnter(e, handleSave)}
			>
				<div
					className={
						isUserOpen ? 'user__modal-content active' : 'user__modal-content'
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
							{!isEditing ? (
								<p id="user-name">{user?.name}</p>
							) : (
								<input
									className="edit-name-input"
									value={editedData.name}
									onChange={handleNameChange}
								/>
							)}
							{!isEditing ? (
								<p id="user-email">e-mail: {user?.email}</p>
							) : (
								<input
									className="edit-email-input"
									value={editedData.email}
									onChange={handleEmailChange}
								/>
							)}
						</div>
						<div className="user-tasks-info-container">
							<p className={isEditing ? 'user-tasks margin' : 'user-tasks'}>
								💻 Tasks: {numberOfTasks}
							</p>
							<p
								className={
									isEditing
										? 'user-completed-tasks margin'
										: 'user-completed-tasks'
								}
							>
								Completed:{' '}
								<span id={completedTasksColor}>{numberOfCompletedTasks}</span>
							</p>
						</div>
					</div>
					<p id="close-cross" onClick={handleClose}>
						❌
					</p>
				</div>
				{!isEditing ? (
					<div className="btns-container" onClick={handleBtnClick}>
						<ActionBtn
							title="Edit user"
							color="#F7A400"
							width="244px"
							onClick={() => setIsEditing(true)}
						/>
						<ActionBtn
							title="Open tasks"
							color="#3A9EFD"
							width="254px"
							onClick={handleOpenTasks}
						/>
						<ActionBtn
							title="Delete user"
							color="#B43873"
							width="263px"
							onClick={handleDelete}
						/>
					</div>
				) : (
					<div className="edit-btns-container">
						<ActionBtn
							title="Save"
							color="#049804"
							width="190px"
							onClick={handleSave}
						/>
						<ActionBtn
							title="Cancel"
							color="#CF5D5D"
							width="220px"
							onClick={handleCancel}
						/>
					</div>
				)}
			</div>
		</Modal>,
		document.getElementById('open-user-portal')!
	)
}

export default UserModal
