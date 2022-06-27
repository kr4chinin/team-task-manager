import { FC, useEffect, useState } from 'react'
import List from '../List'
import UserItem from './UserItem'
import { ITask, IUser } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../loader/Loader'
import Error from '../error/Error'
import { useModalsContext } from '../../context/ModalsContext'
import OpenUserModal from '../modal/user-modal/OpenUserModal'
import {
	getNumberOfTasks,
	getNumberOfCompletedTasks
} from '../../helpers/calculateTasks'

interface UserListPageProps {
	tasks: ITask[]
}

const UserListPage: FC<UserListPageProps> = ({ tasks }) => {
	const [users, setUsers] = useState<IUser[]>([])
	const [sortedUsers, setSortedUsers] = useState<IUser[]>([])
	const [filter, setFilter] = useState('')
	const [currentUser, setCurrentUser] = useState<any>()

	const { setIsUserOpen } = useModalsContext()

	const { execute, status } = useFetching<IUser>(
		'https://jsonplaceholder.typicode.com/users',
		setUsers
	)

	useEffect(() => {
		execute()
	}, [execute])

	function handleOpenModal(id: number) {
		setIsUserOpen(true)
		for (let user of users) {
			if (user.id === id) {
				setCurrentUser(user)
			}
		}
	}

	// getting all tasks for calculations
	const [calcTasks, setCalcTasks] = useState<ITask[]>(tasks)
	const { execute: executeTasks } = useFetching<ITask>(
		`https://jsonplaceholder.typicode.com/todos`,
		setCalcTasks
	)

	useEffect(() => {
		executeTasks()
		setCalcTasks([...tasks, ...calcTasks])
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<OpenUserModal
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
				options={['name', 'email']}
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
