import { Navigate, Route, Routes } from 'react-router-dom'
import Information from './information/Information'
import TaskListPage from './tasks/TaskListPage'
import UserListPage from './users/UserListPage'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<UserListPage />} />
			<Route path="/user-tasks/:id" element={<TaskListPage />} />
			<Route path="/info" element={<Information />} />
            <Route path="*" element={<Navigate to="/#/" replace />} />
		</Routes>
	)
}

export default AppRoutes
