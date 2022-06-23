import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import { ITask } from '../../interfaces'
import ActionPanel from '../action-panel/ActionPanel'
import List from '../List'
import TaskItem from './TaskItem'
import Loader from '../loader/Loader'

type UserTasksParams = {
	id: string
}

const TaskListPage: FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([])
	const params = useParams<UserTasksParams>()

	const { execute, loading } = useFetching<ITask>(
		`https://jsonplaceholder.typicode.com/todos?userId=${params.id}`,
		setTasks
	)

	useEffect(() => {
		execute()
	}, [execute])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<ActionPanel />
			<List
				items={tasks}
				renderItem={(task: ITask) => (
					<div key={task.id}>
						<TaskItem task={task} />
					</div>
				)}
			/>
		</>
	)
}

export default TaskListPage
