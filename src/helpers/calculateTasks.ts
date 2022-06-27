export const calculateTasks = (numberOfCompleted: number, number: number) => {
	const percentage = (numberOfCompleted / number) * 100

	if (percentage >= 0 && percentage <= 50) {
		return 'red'
	} else if (percentage > 50 && percentage <= 80) {
		return 'yellow'
	} else {
		return 'green'
	}
}
