import { Link } from 'react-router-dom'
import cl from './Navbar.module.css'

const Navbar = () => {
	return (
		<nav className={cl.container}>
			<Link to="/" draggable={false}>
				đ Team Task Manager
			</Link>
			<div className={cl.links}>
				<Link to="/" draggable={false}>
					đ Users List
				</Link>
				<Link to="info" draggable={false}>
					âšī¸ Information
				</Link>
			</div>
		</nav>
	)
}

export default Navbar
