import Navbar from './components/navbar/Navbar'
import './styles/App.css'
import { HashRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { ModalContextProvider } from './context/ModalContext'
import WelcomeModal from './components/modal/welcome-modal/WelcomeModal'

function App() {
	return (
		<HashRouter>
			<ModalContextProvider>
				<WelcomeModal />
				<Navbar />
				<div className="content-container">
					<AppRoutes />
				</div>
			</ModalContextProvider>
		</HashRouter>
	)
}

export default App
