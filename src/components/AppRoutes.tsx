import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ITask } from '../interfaces'
import Information from './information/Information'
import TaskListPage from './tasks/TaskListPage'
import UserListPage from './users/UserListPage'

interface AppRoutesProps {
	tasks: ITask[]
	setTasks: (tasks: ITask[]) => void
}

const AppRoutes: FC<AppRoutesProps> = ({ tasks, setTasks }) => {
	return (
		<Routes>
			<Route path="/" element={<UserListPage tasks={tasks} />} />
			<Route
				path="/user-tasks/:id"
				element={<TaskListPage tasks={tasks} setTasks={setTasks} />}
			/>
			<Route path="/info" element={<Information />} />
		</Routes>
	)
}

export default AppRoutes
