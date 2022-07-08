import AddBtn from '../btns/AddBtn'
import SearchBar from '../seach-bar/SearchBar'
import SortBar from '../sort-bar/SortBar'
import cl from './ActionPanel.module.css'

interface ActionPanelProps<T> {
	btnTitle: string
	items: T[]
	setItems: (items: T[]) => void
	searchBy: keyof T
	options: Array<{ value: Extract<keyof T, string>; title: string }>
	setFilter: (filter: string) => void
	onClick: () => void
	isDisabled?: boolean
}

function ActionPanel<T>({
	btnTitle,
	items,
	setItems,
	searchBy,
	options,
	setFilter,
	onClick,
	isDisabled
}: ActionPanelProps<T>) {
	return (
		<div className={cl.container}>
			<AddBtn title={btnTitle} onClick={onClick} disabled={isDisabled} />
			<div className={cl['search-sort-container']}>
				<SearchBar
					items={items}
					setItems={setItems}
					searchBy={searchBy}
					setFilter={setFilter}
				/>
				<SortBar items={items} setItems={setItems} options={options} />
			</div>
		</div>
	)
}

export default ActionPanel
