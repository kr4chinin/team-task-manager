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
