import { Link } from 'react-router-dom'
import cl from './Navbar.module.css'

const Navbar = () => {
	return (
		<nav className={cl.container}>
			<Link to="/">📝 Team Task Manager</Link>
			<div className={cl.links}>
				<Link to="/">📊 Users List</Link>
				<Link to="info">ℹ️ Information</Link>
			</div>
		</nav>
	)
}

export default Navbar
