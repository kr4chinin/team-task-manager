import './styles/TaskModal.css'
import Modal from '../modal-template/Modal'
import { useModalContext } from '../../../context/ModalContext'
import { ITask } from '../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import ActionBtn from '../../btns/ActionBtn'
import { createPortal } from 'react-dom'
import { useEscape } from '../../../hooks/useEscape'
import { saveWithEnter } from '../../../helpers/saveWithEnter'

interface TaskModalProps {
	task: ITask
	tasks: ITask[]
	setTasks: (tasks: ITask[]) => void
}

const TaskModal: FC<TaskModalProps> = ({ task, tasks, setTasks }) => {
	const { isTaskOpen, setIsTaskOpen } = useModalContext()
	const [editedTitle, setEditedTitle] = useState('default')

	useEffect(() => {
		task ? setEditedTitle(task.title) : setEditedTitle('default')
	}, [task])

	function handlePropagation(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEditedTitle(e.target.value)
	}

	function handleCancel() {
		setIsTaskOpen(false)
		task ? setEditedTitle(task.title) : setEditedTitle('default')
	}

	function handleSave() {
		let editedTask: ITask = task
		task.title = editedTitle

		setTasks([...tasks.filter(t => t.id !== task.id), editedTask])
		setIsTaskOpen(false)
	}

	useEscape(setIsTaskOpen)

	return createPortal(
		<Modal isOpen={isTaskOpen} setIsOpen={setIsTaskOpen}>
			<div
				className="task-modal-container"
				onKeyDown={e => saveWithEnter(e, handleSave)}
			>
				<div
					onClick={handlePropagation}
					className={
						isTaskOpen ? 'task__modal-content active' : 'task__modal-content'
					}
				>
					<p id="task-icon">📃</p>
					<input
						className="edit-title-input"
						value={editedTitle}
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

export default TaskModal
