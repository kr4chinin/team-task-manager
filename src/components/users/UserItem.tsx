import { FC } from 'react'
import { IUser } from '../../interfaces'
import cl from './styles/UserItem.module.css'

interface UserItemProps {
	user: IUser
}

const UserItem: FC<UserItemProps> = ({ user }) => {
	return (
		<div className={cl.container}>
			<img
				className={cl.avatar}
				alt="User profile"
				src={`https://picsum.photos/200?random=${user.id}`}
			/>
			<div className={cl['user-info']}>
				<p id={cl.name}>{user.name}</p>
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
