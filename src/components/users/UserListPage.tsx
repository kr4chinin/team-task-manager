import { useEffect, useState } from 'react'
import List from '../List'
import UserItem from './UserItem'
import { IUser } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import { useNavigate } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../loader/Loader'
import Error from '../error/Error'

const UserListPage = () => {
	const [users, setUsers] = useState<IUser[]>([])
	const [sortedUsers, setSortedUsers] = useState<IUser[]>([])

	const navigate = useNavigate()

	const { execute, status } = useFetching<IUser>(
		'https://jsonplaceholder.typicode.com/users',
		setUsers
	)

	useEffect(() => {
		execute()
	}, [execute])

	return (
		<>
			<ActionPanel items={users} setItems={setSortedUsers} searchBy='name'/>
            {status === 'loading' ? <Loader /> : null}
            {status === 'error' ? <Error /> : null}
			<List
				items={sortedUsers}
				renderItem={(user: IUser) => (
					<div onClick={() => navigate(`/user-tasks/${user.id}`)} key={user.id}>
						<UserItem user={user} />
					</div>
				)}
			/>
		</>
	)
}

export default UserListPage
