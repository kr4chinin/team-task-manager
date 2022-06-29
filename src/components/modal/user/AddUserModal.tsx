import { createPortal } from "react-dom"
import { useModalContext } from "../../../context/ModalContext"
import Modal from "../modal-template/Modal"
import './styles/AddUserModal.css'
import './styles/UserModal.css'
import ActionBtn from "../../btns/ActionBtn"
import { FC, useState } from "react"
import { IUser } from "../../../interfaces"

interface AddUserModalProps {
    users: IUser[]
    setUsers: (users: IUser[]) => void
}

const AddUserModal: FC<AddUserModalProps> = ({users, setUsers}) => {

    const { isAddingUser, setIsAddingUser } = useModalContext()

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        id: JSON.parse(localStorage.getItem('users') as string)?.length + 1
    })

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

    function handleSave() {
		setUsers([newUser, ...users])
		setIsAddingUser(false)
        setNewUser({
			name: '',
			email: '',
            id: newUser.id + 1
		})
	}

    function handleCancel() {
		setIsAddingUser(false)
		setNewUser({
			name: '',
			email: '',
            id: newUser.id
		})
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
                        <img
                            id="new-avatar"
                            alt="User avatar"
                            src={newUser ? `https://picsum.photos/id/${newUser.id + 10}/200` : ''}
                        />
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