import { createPortal } from 'react-dom'
import { useModalContext } from '../../../context/ModalContext'
import Modal from '../modal-template/Modal'
import './styles/AddUserModal.css'
import './styles/UserModal.css'
import ActionBtn from '../../btns/ActionBtn'
import { FC, useState } from 'react'
import { IUser } from '../../../interfaces'
import { useEscape } from '../../../hooks/useEscape'
import { generateUserId } from '../../../helpers/generateId'
import MaxUsersError from '../../error/MaxUsersError'

interface AddUserModalProps {
	users: IUser[]
	setUsers: (users: IUser[]) => void
	showPopUp: (isOpen: boolean) => void
	timeoutId: any
}

const AddUserModal: FC<AddUserModalProps> = ({
	users,
	setUsers,
	showPopUp,
	timeoutId
}) => {
	const { isAddingUser, setIsAddingUser } = useModalContext()

	const initialValue = {
		name: '',
		email: '',
		id: 0
	}

	const [newUser, setNewUser] = useState(initialValue)

	function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewUser({ ...newUser, name: e.target.value })
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewUser({ ...newUser, email: e.target.value })
	}

	function handleSaveKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Enter') {
			handleSave()
		}
	}
	function handlePropagation(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
	}

	const [maxUsersWarning, setMaxUsersWarning] = useState(false)

	function handleSave() {
		clearInterval(timeoutId)
		if (+(localStorage.getItem('id') as string) === 500) {
			setMaxUsersWarning(true)
			return 
		}
		let user = {
			...newUser,
			id: generateUserId(users ,setMaxUsersWarning)
		}
		setUsers([user, ...users])
		setIsAddingUser(false)
		setNewUser(initialValue)
		setIsGenereted(false)
		showPopUp(true)
	}

	function handleCancel() {
		setIsAddingUser(false)
		setNewUser({ ...initialValue })
		setIsGenereted(false)
	}

	function handleGeneratePicture() {
		setIsGenereted(true)
	}

	const [isGenerated, setIsGenereted] = useState(false)

	useEscape(setIsAddingUser)

	if (maxUsersWarning) {
		return (
			<MaxUsersError setMaxUserWarning={setMaxUsersWarning} />
		) 
	}

	return createPortal(
		<Modal isOpen={isAddingUser} setIsOpen={setIsAddingUser}>
			<div className="content-and-btns" onKeyDown={handleSaveKeyDown}>
				<div
					className={
						isAddingUser ? 'user__modal-content active' : 'user__modal-content'
					}
					onClick={handlePropagation}
				>
					{isGenerated ? (
						<img
							id="new-avatar"
							alt="User avatar"
							src={
								newUser
									? `https://picsum.photos/id/${users.length + 11}/200`
									: ''
							}
						/>
					) : (
						<div className="generate-avatar" onClick={handleGeneratePicture}>
							<p id="generate-avatar-title">
								👤 Click to generate a profile picture!
							</p>
						</div>
					)}

					<div className="add-user-info-container">
						<div>
							<input
								placeholder="Enter name..."
								className="add-name-input"
								value={newUser.name}
								onChange={handleNameChange}
							/>
							<input
								placeholder="Enter email..."
								className="add-email-input"
								value={newUser.email}
								onChange={handleEmailChange}
							/>
						</div>
					</div>
				</div>

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
			</div>
		</Modal>,
		document.getElementById('add-user-portal')!
	)
}

export default AddUserModal
