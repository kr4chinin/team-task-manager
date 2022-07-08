import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ITask } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import List from '../List'
import TaskItem from './TaskItem'
import { useModalContext } from '../../context/ModalContext'
import TaskModal from '../modal/task/TaskModal'
import AddTaskModal from '../modal/task/AddTaskModal'
import { CSSTransition } from 'react-transition-group'
import '../../styles/List.css'
import TaskPopUps from './TaskPopUps'

type TasksParams = {
	id: string
}

const TaskListPage: FC = () => {
	const [globalTasks, setGlobalTasks] = useState<ITask[]>([])
	const [localTasks, setLocalTasks] = useState<ITask[]>([])
	const [sortedTasks, setSortedTasks] = useState<ITask[]>([])
	const [currentTask, setCurrentTask] = useState<ITask | null>(null)

	const [filter, setFilter] = useState('')
	const { setIsTaskOpen } = useModalContext()

	const params = useParams<TasksParams>()

	function handleOpenModal(id: number) {
		for (let t of localTasks) {
			if (t.id === id) {
				setCurrentTask(t)
			}
		}
		setIsTaskOpen(true)
	}

	useEffect(() => {
		let tasksFromStorage = localStorage.getItem('tasks')
		if (typeof tasksFromStorage === 'string') {
			setLocalTasks(
				JSON.parse(tasksFromStorage).filter(
					(i: ITask) => String(i.userId) === params.id
				)
			)
			setGlobalTasks(JSON.parse(tasksFromStorage))
		}
	}, [params.id])

	useEffect(() => {
		let globalTasksWithoutCurrentTasks = globalTasks.filter(
			t => String(t.userId) !== params.id
		)
		let updatedGlobalTasks = globalTasksWithoutCurrentTasks.concat(
			...sortedTasks
		)
		localStorage.setItem('tasks', JSON.stringify(updatedGlobalTasks))
	}, [sortedTasks, params.id, localTasks, globalTasks])

	const { setIsAddingTask } = useModalContext()

	const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false)
	const [showCompleteTaskPopUp, setShowCompleteTaskPopUp] = useState(false)
	const [showDeleteTaskPopUp, setShowDeleteTaskPopUp] = useState(false)

	return (
		<>
			<TaskPopUps
				showAdd={showAddTaskPopUp}
				setShowAdd={setShowAddTaskPopUp}
				showDelete={showDeleteTaskPopUp}
				setShowDelete={setShowDeleteTaskPopUp}
				showComplete={showCompleteTaskPopUp}
				setShowComplete={setShowCompleteTaskPopUp}
			/>
			<AddTaskModal
				tasks={localTasks}
				setTasks={setLocalTasks}
				showPopUp={setShowAddTaskPopUp}
			/>
			<TaskModal
				task={currentTask as ITask}
				setTasks={setLocalTasks}
				tasks={localTasks}
			/>
			<ActionPanel
				options={[
					{ value: 'title', title: 'title' },
					{ value: 'completed', title: 'completed first' }
				]}
				btnTitle="Add task"
				items={localTasks}
				setItems={setSortedTasks}
				searchBy="title"
				setFilter={setFilter}
				onClick={() => setIsAddingTask(true)}
			/>
			<List
				items={sortedTasks}
				renderItem={(task: ITask) => (
					<CSSTransition key={task.id} timeout={600} classNames="tasks">
						<div key={task.id} onClick={() => handleOpenModal(task.id)}>
							<TaskItem
								task={task}
								filter={filter}
								tasks={localTasks}
								setTasks={setLocalTasks}
								showPopUpDelete={setShowDeleteTaskPopUp}
								showPopUpComplete={setShowCompleteTaskPopUp}
							/>
						</div>
					</CSSTransition>
				)}
			/>
		</>
	)
}

export default TaskListPage
