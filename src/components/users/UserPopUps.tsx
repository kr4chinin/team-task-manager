import PopUpNotification from '../modal/pop-up/PopUpNotification'
import { FC, useRef } from 'react'
import { handlePopUp } from '../../helpers/handlePopUp'
import { IPopUp } from '../../interfaces'

interface UserPopUpsProps {
	showAdd: boolean
	setShowAdd: (isShown: boolean) => void
	showDelete: boolean
	setShowDelete: (isShown: boolean) => void
}

const UserPopUps: FC<UserPopUpsProps> = ({
	showAdd,
	setShowAdd,
	showDelete,
	setShowDelete
}) => {
	let addTimeoutId = useRef<ReturnType<typeof setTimeout>>()
	let deleteTimeoutId = useRef<ReturnType<typeof setTimeout>>()

	const popUps: IPopUp[] = [
		{
			title: '✅ User was successfully added!',
			isOpen: showAdd,
			setIsOpen: setShowAdd,
			handlePopUp: () => handlePopUp(addTimeoutId, setShowAdd),
			color: '#2d9f32'
		},
		{
			title: '⛔️ User was successfully deleted!',
			isOpen: showDelete,
			setIsOpen: setShowDelete,
			handlePopUp: () => handlePopUp(deleteTimeoutId, setShowDelete),
			color: '#dc4236'
		}
	]

	return (
		<>
			{popUps.map(popUp => (
				<PopUpNotification
					key={popUp.title}
					title={popUp.title}
					isOpen={popUp.isOpen}
					setIsOpen={popUp.setIsOpen}
					handlePopUp={popUp.handlePopUp}
					color={popUp.color}
				/>
			))}
		</>
	)
}

export default UserPopUps
