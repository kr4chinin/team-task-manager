import AddButton from '../btns/AddButton'
import SearchBar from '../seach-bar/SearchBar'
import SortBar from '../sort-bar/SortBar'
import cl from './ActionPanel.module.css'

interface ActionPanelProps<T> {
	items: T[]
	setItems: (items: T[]) => void
	searchBy: keyof T
}

function ActionPanel<T> (props: ActionPanelProps<T>) {
	return (
		<div className={cl.container}>
			<AddButton title="Add user" />
			<div className={cl['search-sort-container']}>
				<SearchBar items={props.items} setItems={props.setItems} searchBy={props.searchBy}/>
				<SortBar />
			</div>
		</div>
	)
}

export default ActionPanel
