import { FC, useEffect, useState } from 'react'
import List from '../List'
import UserItem from './UserItem'
import { IUser } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../loader/Loader'
import Error from '../error/Error'
import { useModalContext } from '../../context/ModalContext'
import UserModal from '../modal/user/UserModal'
import {
	getNumberOfTasks,
	getNumberOfCompletedTasks
} from '../../helpers/calculateTasks'
import { ITask } from '../../interfaces'
import AddUserModal from '../modal/user/AddUserModal'

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

	return (
		<>
			<AddUserModal users={users} setUsers={setUsers} />
			<UserModal
				users={users}
				setUsers={setUsers}
				user={currentUser}
				numberOfTasks={getNumberOfTasks(currentUser?.id, calcTasks)}
				numberOfCompletedTasks={getNumberOfCompletedTasks(
					currentUser?.id,
					calcTasks
				)}
			/>
			<ActionPanel
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
			{status === 'error' ? <Error /> : null}
			<List
				items={sortedUsers}
				renderItem={(user: IUser) => (
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
				)}
			/>
		</>
	)
}

export default UserListPage
