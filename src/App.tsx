import Navbar from './components/navbar/Navbar'
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { ModalContextProvider } from './context/ModalContext'

function App() {
	return (
		<BrowserRouter>
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
