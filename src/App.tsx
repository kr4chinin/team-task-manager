import Navbar from './components/navbar/Navbar'
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import AppRoutes from './components/AppRoutes'
import { ITask } from './interfaces'
import { ModalContextProvider } from './context/ModalContext'

function App() {
	const [tasks, setTasks] = useState<ITask[]>([])

	return (
		<BrowserRouter>
			<ModalContextProvider>
				<Navbar />
				<div className="content-container">
					<AppRoutes tasks={tasks} setTasks={setTasks} />
				</div>
			</ModalContextProvider>
		</BrowserRouter>
	)
}

export default App
