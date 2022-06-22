import axios from "axios"
import { useEffect, useState } from "react"
import { ITask } from "../../interfaces"
import List from "../List"
import TaskItem from "./TaskItem"

const TaskListPage = () => {

    const [tasks, setTasks] = useState<ITask[]>([])

    async function fetchTasks() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        setTasks(response.data)
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div>
            <List 
                items={tasks}
                renderItem={(task: ITask) =>
                    <div>
                        <TaskItem task={task} />
                    </div>
                }
            />
        </div>
    )
}

export default TaskListPage