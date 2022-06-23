import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ITask } from "../../interfaces"
import ActionPanel from "../action-panel/ActionPanel"
import List from "../List"
import TaskItem from "./TaskItem"

type UserTasksParams = {
    id: string
}

const TaskListPage: FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([])

    const params = useParams<UserTasksParams>()

    useEffect(() => {
        fetchTasks()
    }, [params.id])

    async function fetchTasks() {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${params.id}`)
        setTasks(response.data)
    }

    return (
        <>
            <ActionPanel />
            <List 
                items={tasks}
                renderItem={(task: ITask) =>
                    <div>
                        <TaskItem task={task} />
                    </div>
                }
            />
        </>
    )
}

export default TaskListPage