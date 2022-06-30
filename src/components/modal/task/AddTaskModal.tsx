import { createPortal } from 'react-dom'
import './styles/TaskModal.css'
import Modal from '../modal-template/Modal'
import { useModalContext } from '../../../context/ModalContext'
import { useState, FC } from 'react'
import { ITask } from '../../../interfaces'
import { useParams } from 'react-router-dom'
import ActionBtn from '../../btns/ActionBtn'
import { useEscape } from '../../../hooks/useEscape'

interface AddTaskModalProps {
    tasks: ITask[]
    setTasks: (tasks: ITask[]) => void
}

const AddTaskModal: FC<AddTaskModalProps> = ({ tasks, setTasks }) => {
    const { isAddingTask, setIsAddingTask } = useModalContext()

    const params = useParams()

    const initialValue = {
        title: '',
        id: 0,
        userId: params.id ? +params.id : 0,
        completed: false
    }

    const [newTask, setNewTask] = useState<ITask>(initialValue)

    function handlePropagation(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewTask({ ...newTask, title: e.target.value })
    }

    function handleCancel() {
        setIsAddingTask(false)
        setNewTask(initialValue)
    }

    function handleSave() {
        let task = {
            ...newTask,
            id: tasks.length + 1
        }
        setTasks([task, ...tasks])
        setIsAddingTask(false)
        setNewTask(initialValue)
    }

    useEscape(setIsAddingTask)

    function handleSaveKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter') {
            handleSave()
        }
    }

    return createPortal(


        <Modal isOpen={isAddingTask} setIsOpen={setIsAddingTask}>
            <div className="task-modal-container" onKeyDown={handleSaveKeyDown}>
                <div
                    onClick={handlePropagation}
                    className={
                        isAddingTask ? 'task__modal-content active' : 'task__modal-content'
                    }
                >
                    <p id="task-icon">📄</p>
                    <input
                        className="edit-title-input"
                        value={newTask.title}
                        onChange={handleChange}
                    />
                </div>
                <div onClick={handlePropagation} className="task-btns-container">
                    <ActionBtn
                        title="Save"
                        color="#049804"
                        width="180px"
                        onClick={handleSave}
                    />
                    <ActionBtn
                        title="Cancel"
                        color="#CF5D5D"
                        width="200px"
                        onClick={handleCancel}
                    />
                </div>
            </div>
        </Modal>,
        document.getElementById('open-task-portal')!
    )
}

export default AddTaskModal
