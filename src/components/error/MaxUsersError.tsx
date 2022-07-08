import { FC } from 'react'
import ActionBtn from '../btns/ActionBtn'
import cl from './styles/MaxUsersError.module.css'

interface MaxUsersErrorProps {
	setMaxUserWarning: (isWarning: boolean) => void
}

const MaxUsersError: FC<MaxUsersErrorProps> = ({ setMaxUserWarning }) => {
	function handleClearStorage() {
		setMaxUserWarning(false)
	}

	return (
		<article className={cl.container}>
			<h2 className={cl.title}>No more users can be added!</h2>
			<p className={cl['error__paragraph']}>
				{' '}
				You've reached <b>max amount</b> of users which is <b>500</b>. Delete
				some of them to add a new one.
			</p>
			<ActionBtn
				onClick={handleClearStorage}
				title="I understand"
				color="red"
				width="300px"
			/>
		</article>
	)
}

export default MaxUsersError
