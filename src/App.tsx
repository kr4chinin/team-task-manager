import Navbar from './components/navbar/Navbar'
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import OpenUserModal from './components/modal/user-modal/OpenUserModal'
import { ModalsContextProvider } from './context/ModalsContext'

function App() {

	

	return (
		<BrowserRouter>
			<ModalsContextProvider>
				<Navbar />
				<div className="content-container">
					<AppRoutes />
				</div>
			</ModalsContextProvider>
		</BrowserRouter>
	)
}

export default App
