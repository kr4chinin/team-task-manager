import Navbar from './components/navbar/Navbar'
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { ModalContextProvider } from './context/ModalContext'
import WelcomeModal from './components/modal/welcome-modal/WelcomeModal'

function App() {
	return (
		<BrowserRouter>
			<ModalContextProvider>
				<WelcomeModal />
				<Navbar />
				<div className="content-container">
					<AppRoutes />
				</div>
			</ModalContextProvider>
		</BrowserRouter>
	)
}

export default App
