import ActionPanel from "./components/action-panel/ActionPanel"
import Navbar from "./components/navbar/Navbar"
import UserItem from "./components/user/UserItem"
import './styles/App.css'

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className='content-container'>
				<ActionPanel />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
				<UserItem />
			</div>
		</div>
	)
}

export default App
