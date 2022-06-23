export interface IUser {
	id: number
	name: string
	email: string
}

export interface ITask {
	id: number
	userId: number
	title: string
	completed: boolean
}
