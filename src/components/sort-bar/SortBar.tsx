import React, { useEffect, useState } from 'react'
import './SortBar.module.css'

interface SortBarProps<T> {
	items: T[]
	setItems: (items: T[]) => void
	options: Array<{ value: Extract<keyof T, string>; title: string }>
}

function SortBar<T>({ items, setItems, options }: SortBarProps<T>) {
	const [value, setValue] = useState<keyof T>(options[0].value)

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
				if (typeof x === 'number' && typeof y === 'number') {
					return y - x
				}
				return 0
			})
		)
	}, [value, items, setItems])

	return (
		<select onChange={handleChange}>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.title}
				</option>
			))}
		</select>
	)
}

export default SortBar
