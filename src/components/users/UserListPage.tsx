import { FC, useEffect, useState } from 'react'
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
import { CSSTransition } from 'react-transition-group'
import '../../styles/List.css'
import UserPopUps from './UserPopUps'

const UserListPage: FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([])

	const { execute: executeTasks } = useFetching<ITask>(
		`https://jsonplaceholder.typicode.com/todos`,
		setTasks
	)

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

		let tasksFromStorage = localStorage.getItem('tasks')
		if (typeof tasksFromStorage === 'string') {
			setCalcTasks(JSON.parse(tasksFromStorage))
		}
	}, [tasks])

	const [users, setUsers] = useState<IUser[]>([])
	const [sortedUsers, setSortedUsers] = useState<IUser[]>([])
	const [filter, setFilter] = useState('')
	const [currentUser, setCurrentUser] = useState<IUser | null>(null)

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

	const { setIsAddingUser } = useModalContext()

	const [showAddUserPopUp, setShowAddUserPopUp] = useState(false)
	const [showDeleteUserPopUp, setShowDeleteUserPopUp] = useState(false)

	return (
		<>
			<UserPopUps
				showAdd={showAddUserPopUp}
				setShowAdd={setShowAddUserPopUp}
				showDelete={showDeleteUserPopUp}
				setShowDelete={setShowDeleteUserPopUp}
			/>
			<AddUserModal
				users={users}
				setUsers={setUsers}
				showPopUp={setShowAddUserPopUp}
			/>
			<UserModal
				tasks={tasks}
				setTasks={setTasks}
				users={users}
				setUsers={setUsers}
				user={currentUser as IUser}
				numberOfTasks={getNumberOfTasks(currentUser?.id as number, calcTasks)}
				numberOfCompletedTasks={getNumberOfCompletedTasks(
					currentUser?.id as number,
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
