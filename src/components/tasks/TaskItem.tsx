import React, { FC } from 'react'
import { ITask } from '../../interfaces'
import cl from './styles/TaskItem.module.css'
import Highlight from '../../helpers/highlighter/Highlight'

interface TaskItemProps {
	task: ITask
	filter: string
	tasks: ITask[]
	setTasks: (tasks: ITask[]) => void
	showPopUpDelete: (isShown: boolean) => void
	showPopUpComplete: (isShown: boolean) => void
}

const TaskItem: FC<TaskItemProps> = ({ task, filter, tasks, setTasks, showPopUpDelete, showPopUpComplete }) => {
	const light = (str: string) => {
		return <Highlight filter={filter} str={str} />
	}

	function handleComplete(e: React.MouseEvent<HTMLParagraphElement>) {
		showPopUpComplete(true)
		e.stopPropagation()
		let completedTask = task
		completedTask.completed = true
		setTasks([...tasks.filter(t => t.id !== task.id), completedTask])
	}

	function handleDelete(e: React.MouseEvent<HTMLParagraphElement>) {
		showPopUpDelete(true)
		e.stopPropagation()
		setTasks(tasks.filter(t => t.id !== task.id))
	}

	return (
		<div className={cl.container}>
			<p id={cl.indicator}>{task.completed ? '🟢' : '🔴'}</p>
			<p id={cl.title}>{light(task.title)}</p>
			<div className={cl['btn-container']}>
				<p
					id={!task.completed ? cl.completeBtn : cl.completed}
					onClick={handleComplete}
				>
					✔
				</p>
				<p id={cl.deleteBtn} onClick={handleDelete}>
					❌
				</p>
			</div>
		</div>
	)
}

export default TaskItem
