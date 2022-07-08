import React from 'react'
import '../styles/List.css'
import { TransitionGroup } from 'react-transition-group'

interface ListProps<T> {
	items: T[]
	renderItem: (item: T) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {
	return <TransitionGroup>{props.items.map(props.renderItem)}</TransitionGroup>
}
