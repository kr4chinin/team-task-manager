import Navbar from './components/navbar/Navbar'
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="content-container">
				<AppRoutes />
			</div>
		</BrowserRouter>
	)
}

export default App
