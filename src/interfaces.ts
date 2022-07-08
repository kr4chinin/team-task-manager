export interface IUser {
	id: number
	name: string
	email: string
	numberOfCompletedTasks?: number
}

export interface ITask {
	id: number
	userId: number
	title: string
	completed: boolean
}

export interface IPopUp {
	title: string
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	handlePopUp: () => void
	color: string
}
