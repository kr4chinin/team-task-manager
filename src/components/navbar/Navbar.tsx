import cl from './Navbar.module.css'

const Navbar = () => {
    return (
        <div className={cl.container}>
            <p>📝 Team Task Manager</p>
            <div className={cl.links}>
                <p id={cl['first-link']}>📊 Users List</p>
                <p>ℹ️ Information</p>
            </div>
        </div>
    )
}

export default Navbar