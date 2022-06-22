import { FC } from "react"
import { ITask } from "../../interfaces"
import cl from './styles/TaskItem.module.css'

interface TaskItemProps {
    task: ITask
}

const TaskItem: FC<TaskItemProps> = ({task}) => {
    return (
        <div className={cl.container}>
            <p id={cl.indicator}>{task.completed ? '🟢' : '🔴'}</p>
            <p id={cl.title}>{task.title}</p>
            <div className={cl['btn-container']}>
                <p id={cl.completeBtn}>✔</p>
                <p id={cl.deleteBtn}>❌</p>
            </div>
        </div>
    )
}

export default TaskItem