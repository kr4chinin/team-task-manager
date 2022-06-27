import { FC } from 'react'
import { IUser } from '../../interfaces'
import Highlight from '../../helpers/highlighter/Highlight'
import cl from './styles/UserItem.module.css'
import { calculateTasks } from '../../helpers/calculateTasks'

interface UserItemProps {
	user: IUser
	filter: string
	numberOfTasks: number
	numberOfCompletedTasks: number
}

const UserItem: FC<UserItemProps> = ({
	user,
	filter,
	numberOfTasks,
	numberOfCompletedTasks
}) => {
	const light = (str: string) => {
		return <Highlight filter={filter} str={str} />
	}

	let completedTasksColor = calculateTasks(
		numberOfCompletedTasks,
		numberOfTasks
	)

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
				<p id={cl.tasks}>💻 Tasks: {numberOfTasks}</p>
				<p id={cl.completed}>
					Completed:{' '}
					<span className={cl[completedTasksColor]}>
						{numberOfCompletedTasks}
					</span>
				</p>
			</div>
		</div>
	)
}

export default UserItem
