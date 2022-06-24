import React, { useEffect, useState } from 'react'
import './SortBar.module.css'

interface SortBarProps<T> {
	items: T[]
	setItems: (items: T[]) => void
	options: Array<Extract<keyof T, string>>
}

function SortBar<T>({ items, setItems, options }: SortBarProps<T>) {
	const [value, setValue] = useState<keyof T>(options[0])

	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setValue(e.target.value as keyof T)
	}

	useEffect(() => {
		setItems(
			[...items].sort((a, b) => {
				let x = a[value]
				let y = b[value]
				if (typeof x === 'string' && typeof y === 'string') {
					return x.localeCompare(y)
				}
				if (typeof x === 'boolean' && typeof y === 'boolean') {
					return String(y).localeCompare(String(x))
				}
				return 0
			})
		)
	}, [value, items, setItems])

	return (
		<select onChange={handleChange}>
			{options.map(option => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	)
}

export default SortBar
