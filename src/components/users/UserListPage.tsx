import axios from 'axios'
import { useEffect, useState } from 'react'
import List from '../List'
import UserItem from './UserItem'
import { IUser } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import { useNavigate } from 'react-router-dom'
import Loader from '../loader/Loader'

const UserListPage = () => {
	const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	async function fetchUsers() {
        setIsLoading(true)
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		)
        setIsLoading(false)
		setUsers(response.data)
	}

	useEffect(() => {
		fetchUsers()
	}, [])

    if (isLoading) {
        return <Loader />
    }

	return (
		<>
			<ActionPanel />
			<List
				items={users}
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
