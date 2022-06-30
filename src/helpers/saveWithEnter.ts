export const saveWithEnter = (
	e: React.KeyboardEvent<HTMLDivElement>,
	handleSave: () => void
) => {
	if (e.key === 'Enter') {
		handleSave()
	}
}
