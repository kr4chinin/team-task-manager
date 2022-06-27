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

interface UserListPageProps {
	tasks: ITask[]
}

const UserListPage: FC<UserListPageProps> = ({ tasks }) => {
	const [users, setUsers] = useState<IUser[]>([])
	const [sortedUsers, setSortedUsers] = useState<IUser[]>([])
	const [filter, setFilter] = useState('')
	const [currentId, setCurrentId] = useState(0)

	const { execute, status } = useFetching<IUser>(
		'https://jsonplaceholder.typicode.com/users',
		setUsers
	)

	useEffect(() => {
		execute()
	}, [execute])

	const { setIsUserOpen } = useModalsContext()

	function handleOpenModal(id: number) {
		setCurrentId(id)
		setIsUserOpen(true)
	}

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

	function getNumberOfTasks(id: number) {
		let count = 0
		for (let t of calcTasks) {
			if (t.userId === id) {
				count++
			}
		}
		return count
	}

	function getNumberOfCompletedTasks(id: number) {
		let count = 0
		for (let t of calcTasks) {
			if (t.userId === id) {
				if (t.completed) count++
			}
		}
		return count
	}

	return (
		<>
			<OpenUserModal id={currentId} />
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
							numberOfTasks={getNumberOfTasks(user.id)}
							numberOfCompletedTasks={getNumberOfCompletedTasks(user.id)}
						/>
					</div>
				)}
			/>
		</>
	)
}

export default UserListPage
