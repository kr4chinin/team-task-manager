import React, { useEffect, useState } from 'react'
import cl from './SearchBar.module.css'

interface SearchBarProps<T> {
	items: T[]
	setItems: (items: T[]) => void
	searchBy: keyof T
	setFilter: (filter: string) => void
}

function SearchBar<T>({
	items,
	setItems,
	searchBy,
	setFilter
}: SearchBarProps<T>) {
	const [value, setValue] = useState<string>('')

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
		setFilter(e.target.value)
	}

	useEffect(() => {
		setItems(
			items.filter((item: T) => {
				const query = item[searchBy]
				if (typeof query === 'string') {
					return query.toLowerCase().includes(value.toLowerCase())
				} else {
					return false
				}
			})
		)
	}, [value, items, searchBy, setItems])

	return (
		<input
			className={cl['search-bar']}
			value={value}
			onChange={handleChange}
			placeholder="Search..."
		/>
	)
}

export default SearchBar
