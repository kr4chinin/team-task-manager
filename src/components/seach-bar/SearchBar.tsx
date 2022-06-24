import React, { useEffect, useState } from 'react'
import './SearchBar.module.css'

interface SearchBarProps<T> {
	items: T[]
	setItems: (items: T[]) => void
	searchBy: keyof T
}

function SearchBar<T>({items, setItems, searchBy}: SearchBarProps<T>) {

	const [value, setValue] = useState<string>('')

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
	}

	useEffect(() => {
		setItems(items.filter((item: T) => {
			const query = item[searchBy]
			if (typeof query === 'string') {
				return query.toLowerCase().includes(value.toLowerCase())
			} else {
				return false
			}
		}
		))
	}, [value, items, searchBy, setItems])

	return <input value={value} onChange={handleChange} placeholder="Search..." />
}

export default SearchBar
