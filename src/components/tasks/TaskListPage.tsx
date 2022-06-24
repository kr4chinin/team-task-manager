import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import { ITask } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import List from '../List'
import TaskItem from './TaskItem'
import Loader from '../loader/Loader'
import Error from '../error/Error'

type UserTasksParams = {
	id: string
}

const TaskListPage: FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([])
	const [sortedTasks, setSortedTasks] = useState<ITask[]>([])
	const [filter, setFilter] = useState('')

	const params = useParams<UserTasksParams>()

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
