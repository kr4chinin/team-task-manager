import cl from './styles/UserItem.module.css'

const UserItem = () => {
    return (
        <div className={cl.container}>
            <div className={cl.avatar}>

            </div>
            <div className={cl['user-info']}>
                <p id={cl.name}>Tom Cruise</p>
                <p id={cl.email}>tomcruise@email.ru</p>
            </div>
            <div>
                <p id={cl.tasks}>💻 Tasks: <span>10</span></p>
                <p id={cl.completed}>Completed: <span>5</span></p>
            </div>
        </div>
    )
}

export default UserItem