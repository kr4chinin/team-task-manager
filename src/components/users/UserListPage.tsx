import { useEffect, useState } from 'react'
import List from '../List'
import UserItem from './UserItem'
import { IUser } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import { useNavigate } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../loader/Loader'
import Error from '../error/Error'
import { useModalsContext } from '../../context/ModalsContext'
import OpenUserModal from '../modal/user-modal/OpenUserModal'

const UserListPage = () => {
	const [users, setUsers] = useState<IUser[]>([])
	const [sortedUsers, setSortedUsers] = useState<IUser[]>([])
	const [filter, setFilter] = useState('')
	const [currentId, setCurrentId] = useState(0) 

	const navigate = useNavigate()

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

	return (
		<>
			<OpenUserModal id={currentId}/>
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
						<UserItem user={user} filter={filter} />
					</div>
				)}
			/>
		</>
	)
}

export default UserListPage
