import ActionPanel from "./components/action-panel/ActionPanel"
import Navbar from "./components/navbar/Navbar"
import TaskListPage from "./components/tasks/TaskListPage"
import UserListPage from "./components/users/UserListPage"
import './styles/App.css'

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className='content-container'>
				<ActionPanel />
				<UserListPage />
				<TaskListPage />
			</div>
		</div>
	)
}

export default App
