import AddButton from '../btns/AddButton'
import SearchBar from '../seach-bar/SearchBar'
import SortBar from '../sort-bar/SortBar'
import cl from './ActionPanel.module.css'

const ActionPanel = () => {
    return (
        <div className={cl.container}>
            <AddButton title='Add user' />
            <div className={cl['search-sort-container']}>
                <SearchBar />
                <SortBar />
            </div>
        </div>
    )
}

export default ActionPanel