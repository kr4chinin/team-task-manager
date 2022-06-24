import AddButton from '../btns/AddButton'
import SearchBar from '../seach-bar/SearchBar'
import SortBar from '../sort-bar/SortBar'
import cl from './ActionPanel.module.css'

interface ActionPanelProps<T> {
	btnTitle: string
	items: T[]
	setItems: (items: T[]) => void
	searchBy: keyof T
	options: Array<Extract<keyof T, string>>
}

function ActionPanel<T>({
	btnTitle,
	items,
	setItems,
	searchBy,
	options
}: ActionPanelProps<T>) {
	return (
		<div className={cl.container}>
			<AddButton title={btnTitle} />
			<div className={cl['search-sort-container']}>
				<SearchBar items={items} setItems={setItems} searchBy={searchBy} />
				<SortBar items={items} setItems={setItems} options={options} />
			</div>
		</div>
	)
}

export default ActionPanel
