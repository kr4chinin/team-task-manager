import { FC, useEffect, useRef, useState } from 'react'
import List from '../List'
import UserItem from './UserItem'
import { IUser } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../loader/Loader'
import CommonError from '../error/CommonError'
import { useModalContext } from '../../context/ModalContext'
import UserModal from '../modal/user/UserModal'
import {
	getNumberOfTasks,
	getNumberOfCompletedTasks
} from '../../helpers/calculateTasks'
import { ITask } from '../../interfaces'
import AddUserModal from '../modal/user/AddUserModal'
import PopUpNotification from '../modal/pop-up/PopUpNotification'
import { CSSTransition } from 'react-transition-group'
import '../../styles/List.css'

const UserListPage: FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([])

	const { execute: executeTasks } = useFetching<ITask>(
		`https://jsonplaceholder.typicode.com/todos`,
		setTasks
	)

	let addTimeoutId = useRef<any>()
	let deleteTimeoutId = useRef<any>()

	useEffect(() => {
		if (localStorage.getItem('tasks') === null) {
			executeTasks()
		} else {
			let tasksFromStorage = localStorage.getItem('tasks')
			if (typeof tasksFromStorage === 'string') {
				setTasks(JSON.parse(tasksFromStorage))
			}
		}
	}, [executeTasks])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const [users, setUsers] = useState<IUser[]>([])
	const [sortedUsers, setSortedUsers] = useState<IUser[]>([])
	const [filter, setFilter] = useState('')
	const [currentUser, setCurrentUser] = useState<any>()

	const { setIsUserOpen } = useModalContext()

	const { execute, status } = useFetching<IUser>(
		'https://jsonplaceholder.typicode.com/users',
		setUsers
	)

	if (status === 'error') {
		localStorage.clear()
	}

	useEffect(() => {
		if (localStorage.getItem('users') === null) {
			execute()
		} else {
			let usersFromStorage = localStorage.getItem('users')
			if (typeof usersFromStorage === 'string') {
				setUsers(JSON.parse(usersFromStorage))
			}
		}
	}, [execute])

	useEffect(() => {
		localStorage.setItem('users', JSON.stringify(users))
	}, [users])

	function handleOpenModal(id: number) {
		setIsUserOpen(true)
		for (let user of users) {
			if (user.id === id) {
				setCurrentUser(user)
			}
		}
	}

	const [calcTasks, setCalcTasks] = useState<ITask[]>([])

	useEffect(() => {
		let tasksFromStorage = localStorage.getItem('tasks')
		if (typeof tasksFromStorage === 'string') {
			setCalcTasks(JSON.parse(tasksFromStorage))
		}
	}, [tasks])

	const { setIsAddingUser } = useModalContext()

	const [showAddUserPopUp, setShowAddUserPopUp] = useState(false)
	const [showDeleteUserPopUp, setShowDeleteUserPopUp] = useState(false)

	function handleAddPopUp() {
		if (addTimeoutId.current) {
			clearTimeout(addTimeoutId.current)
		}
		setShowAddUserPopUp(true)
		addTimeoutId.current = setTimeout(() => {
			setShowAddUserPopUp(false)
		}, 1500)
	}

	function handleDeletePopUp() {
		if (deleteTimeoutId.current) {
			clearTimeout(deleteTimeoutId.current)
		}
		setShowDeleteUserPopUp(true)
		deleteTimeoutId.current = setTimeout(() => {
			setShowDeleteUserPopUp(false)
		}, 1500)
	}

	return (
		<>
			<PopUpNotification
				title="✅ User was successfully added!"
				isOpen={showAddUserPopUp}
				setIsOpen={setShowAddUserPopUp}
				handlePopUp={handleAddPopUp}
				color="#2d9f32"
			/>
			<PopUpNotification
				title="⛔️ User was successfully deleted!"
				isOpen={showDeleteUserPopUp}
				setIsOpen={setShowDeleteUserPopUp}
				handlePopUp={handleDeletePopUp}
				color="#dc4236"
			/>
			<AddUserModal
				users={users}
				setUsers={setUsers}
				showPopUp={setShowAddUserPopUp}
				timeoutId={addTimeoutId.current}
			/>
			<UserModal
				tasks={tasks}
				setTasks={setTasks}
				users={users}
				setUsers={setUsers}
				user={currentUser}
				numberOfTasks={getNumberOfTasks(currentUser?.id, calcTasks)}
				numberOfCompletedTasks={getNumberOfCompletedTasks(
					currentUser?.id,
					calcTasks
				)}
				showPopUp={setShowDeleteUserPopUp}
			/>
			<ActionPanel
				isDisabled={users.length === 500}
				onClick={() => setIsAddingUser(true)}
				options={[
					{ value: 'name' as keyof IUser, title: 'name' },
					{ value: 'email', title: 'email' },
					{ value: 'numberOfCompletedTasks', title: 'completed tasks' }
				]}
				btnTitle="Add user"
				items={users}
				setItems={setSortedUsers}
				searchBy="name"
				setFilter={setFilter}
			/>
			{status === 'loading' ? <Loader /> : null}
			{status === 'error' ? <CommonError /> : null}
			<List
				items={sortedUsers}
				renderItem={(user: IUser) => (
					<CSSTransition key={user.id} timeout={600} classNames="users">
						<div onClick={() => handleOpenModal(user.id)} key={user.id}>
							<UserItem
								user={user}
								filter={filter}
								numberOfTasks={getNumberOfTasks(user.id, calcTasks)}
								numberOfCompletedTasks={getNumberOfCompletedTasks(
									user.id,
									calcTasks
								)}
							/>
						</div>
					</CSSTransition>
				)}
			/>
		</>
	)
}

export default UserListPage
