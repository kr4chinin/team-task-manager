import axios from "axios"
import { useEffect, useState } from "react"
import List from "../List"
import UserItem from "./UserItem"
import { IUser } from "../../interfaces"
import ActionPanel from "../action-panel/ActionPanel"
import { useNavigate } from "react-router-dom"

const UserListPage = () => {

    const [users, setUsers] = useState<IUser[]>([])

    const navigate = useNavigate()

    async function fetchUsers() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <ActionPanel />
            <List 
                items={users}
                renderItem={(user: IUser) => 
                    <div onClick={() => navigate(`/user-tasks/${user.id}`)}>
                        <UserItem user={user} />
                    </div>
                }
            />
        </>
    )
}

export default UserListPage