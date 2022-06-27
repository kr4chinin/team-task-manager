import { FC } from 'react'
import { IUser } from '../../interfaces'
import Highlight from '../../helpers/highlighter/Highlight'
import cl from './styles/UserItem.module.css'

interface UserItemProps {
	user: IUser
	filter: string
}

const UserItem: FC<UserItemProps> = ({ user, filter }) => {
	const light = (str: string) => {
		return <Highlight filter={filter} str={str} />
	}

	return (
		<div className={cl.container}>
			<img
				className={cl.avatar}
				alt="User profile"
				src={`https://picsum.photos/id/${user.id + 10}/200`}
			/>
			<div className={cl['user-info']}>
				<p id={cl.name}>{light(user.name)}</p>
				<p id={cl.email}>{user.email}</p>
			</div>
			<div>
				<p id={cl.tasks}>
					💻 Tasks: <span>10</span>
				</p>
				<p id={cl.completed}>
					Completed: <span>5</span>
				</p>
			</div>
		</div>
	)
}

export default UserItem
