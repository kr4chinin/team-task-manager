import { FC } from 'react'
import { ITask } from '../../interfaces'
import cl from './styles/TaskItem.module.css'
import Highlight from '../../helpers/highlighter/Highlight'

interface TaskItemProps {
	task: ITask
	filter: string
}

const TaskItem: FC<TaskItemProps> = ({ task, filter }) => {

	const light = (str: any) => {
		return <Highlight filter={filter} str={str} />
	}

	return (
		<div className={cl.container}>
			<p id={cl.indicator}>{task.completed ? '🟢' : '🔴'}</p>
			<p id={cl.title}>{light(task.title)}</p>
			<div className={cl['btn-container']}>
				<p id={cl.completeBtn}>✔</p>
				<p id={cl.deleteBtn}>❌</p>
			</div>
		</div>
	)
}

export default TaskItem
