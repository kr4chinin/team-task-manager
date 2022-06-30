import { FC, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ITask } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import List from '../List'
import TaskItem from './TaskItem'
import { useModalContext } from '../../context/ModalContext'
import TaskModal from '../modal/task/TaskModal'
import AddTaskModal from '../modal/task/AddTaskModal'
import PopUpNotification from '../modal/pop-up/PopUpNotification'

type TasksParams = {
	id: string
}

const TaskListPage: FC = () => {
	const [globalTasks, setGlobalTasks] = useState<ITask[]>([])
	const [localTasks, setLocalTasks] = useState<ITask[]>([])
	const [sortedTasks, setSortedTasks] = useState<ITask[]>([])
	const [currentTask, setCurrentTask] = useState<any>()

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
		let t = globalTasks.filter(t => String(t.userId) !== params.id)
		let x = t.concat(...sortedTasks)
		localStorage.setItem('tasks', JSON.stringify(x))
	}, [sortedTasks, params.id, localTasks, globalTasks])

	const { setIsAddingTask } = useModalContext()

	let addTimeoutId = useRef<any>()
	let deleteTimeoutId= useRef<any>()
	let completeTimeoutId = useRef<any>()

	const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false)
	const [showCompleteTaskPopUp, setShowCompleteTaskPopUp] = useState(false)
	const [showDeleteTaskPopUp, setShowDeleteTaskPopUp] = useState(false)

	function handleAddPopUp() {
		if (addTimeoutId.current) {
			clearTimeout(addTimeoutId.current)
		}
		setShowAddTaskPopUp(true)
		addTimeoutId.current = setTimeout(() => {
			setShowAddTaskPopUp(false)
		}, 1500)
	}

	function handleCompletePopUp() {
		if (completeTimeoutId.current) {
			clearTimeout(completeTimeoutId.current)
		}
		setShowCompleteTaskPopUp(true)
		completeTimeoutId.current = setTimeout(() => {
			setShowCompleteTaskPopUp(false)
		}, 1500)
	}

	function handleDeletePopUp() {
		if (deleteTimeoutId.current) {
			clearTimeout(deleteTimeoutId.current)
		}
		setShowDeleteTaskPopUp(true)
		deleteTimeoutId.current = setTimeout(() => {
			setShowDeleteTaskPopUp(false)
		}, 1500)
	}

	return (
		<>
			<PopUpNotification
				title="✅ Task was successfully added!"
				isOpen={showAddTaskPopUp}
				setIsOpen={setShowAddTaskPopUp}
				handlePopUp={handleAddPopUp}
				color="#2aa92a"
			/>
			<PopUpNotification
				title="⛔️ Task was successfully deleted!"
				isOpen={showDeleteTaskPopUp}
				setIsOpen={setShowDeleteTaskPopUp}
				handlePopUp={handleDeletePopUp}
				color="#dc4236"
			/>
			<PopUpNotification
				title="🚀 Task was successfully completed!"
				isOpen={showCompleteTaskPopUp}
				setIsOpen={setShowCompleteTaskPopUp}
				handlePopUp={handleCompletePopUp}
				color="yellowgreen"
			/>
			<AddTaskModal tasks={localTasks} setTasks={setLocalTasks} showPopUp={setShowAddTaskPopUp} />
			<TaskModal
				task={currentTask}
				setTasks={setLocalTasks}
				tasks={localTasks}
			/>
			<ActionPanel
				options={[
					{ value: 'title', title: 'title' },
					{ value: 'completed', title: 'completed' }
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
				)}
			/>
		</>
	)
}

export default TaskListPage
