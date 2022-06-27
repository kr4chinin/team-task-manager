import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import { ITask } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import List from '../List'
import TaskItem from './TaskItem'
import Loader from '../loader/Loader'
import Error from '../error/Error'

type TasksParams = {
	id: string
}

interface TaskListPageProps {
	tasks: ITask[]
	setTasks: (tasks: ITask[]) => void
}

const TaskListPage: FC<TaskListPageProps> = ({ tasks, setTasks }) => {
	const [sortedTasks, setSortedTasks] = useState<ITask[]>([])
	const [filter, setFilter] = useState('')

	const params = useParams<TasksParams>()

	const { execute, status } = useFetching<ITask>(
		`https://jsonplaceholder.typicode.com/todos?userId=${params.id}`,
		setTasks
	)

	useEffect(() => {
		execute()
	}, [execute])

	return (
		<>
			<ActionPanel
				options={['title', 'completed']}
				btnTitle="Add task"
				items={tasks}
				setItems={setSortedTasks}
				searchBy="title"
				setFilter={setFilter}
			/>
			{status === 'loading' ? <Loader /> : null}
			{status === 'error' ? <Error /> : null}
			<List
				items={sortedTasks}
				renderItem={(task: ITask) => (
					<div key={task.id}>
						<TaskItem task={task} filter={filter} />
					</div>
				)}
			/>
		</>
	)
}

export default TaskListPage
