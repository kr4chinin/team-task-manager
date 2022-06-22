import axios from "axios"
import { useEffect, useState } from "react"
import List from "../List"
import UserItem from "./UserItem"
import { IUser } from "../../interfaces"

const UserListPage = () => {

    const [users, setUsers] = useState<IUser[]>([])

    async function fetchUsers() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <List 
                items={users}
                renderItem={(user: IUser) => 
                    <div>
                        <UserItem user={user} />
                    </div>
                }
            />
        </div>
    )
}

export default UserListPage