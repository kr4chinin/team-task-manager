import Navbar from './components/navbar/Navbar'
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { ModalContextProvider } from './context/ModalContext'
import { useEffect, useState } from 'react'
import WelcomeModal from './components/modal/welcome-modal/WelcomeModal'

function App() {
	const [isOpen, setIsOpen] = useState(false)

	// show welcoming modal window when user entered the app first time
	useEffect(() => {
		let firstAuth = JSON.parse(localStorage.getItem('firstAuth') as string)
		if (!firstAuth) {
			localStorage.setItem('firstAuth', 'false')
		}
		if (firstAuth === null) {
			setIsOpen(true)
		}
	}, [])

	return (
		<BrowserRouter>
			<WelcomeModal isOpen={isOpen} setIsOpen={setIsOpen} />
			<ModalContextProvider>
				<Navbar />
				<div className="content-container">
					<AppRoutes />
				</div>
			</ModalContextProvider>
		</BrowserRouter>
	)
}

export default App
