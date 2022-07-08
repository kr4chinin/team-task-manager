import { ITask } from '../interfaces'

export const calculateTasks = (numberOfCompleted: number, number: number) => {
	if (number === 0) {
		return 'red'
	}

	const percentage = (numberOfCompleted / number) * 100

	if (percentage >= 0 && percentage <= 50) {
		return 'red'
	} else if (percentage > 50 && percentage <= 80) {
		return 'yellow'
	} else {
		return 'green'
	}
}

export const getNumberOfTasks = (id: number, calcTasks: ITask[]) => {
	let count = 0
	for (let t of calcTasks) {
		if (t.userId === id) {
			count++
		}
	}
	return count
}

export const getNumberOfCompletedTasks = (id: number, calcTasks: ITask[]) => {
	let count = 0
	for (let t of calcTasks) {
		if (t.userId === id) {
			if (t.completed) count++
		}
	}
	return count
}
