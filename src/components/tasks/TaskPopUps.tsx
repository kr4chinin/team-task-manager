import PopUpNotification from '../modal/pop-up/PopUpNotification'
import { FC, useRef } from 'react'
import { handlePopUp } from '../../helpers/handlePopUp'
import { IPopUp } from '../../interfaces'

interface TaskPopUpsProps {
	showAdd: boolean
	setShowAdd: (isShown: boolean) => void
	showDelete: boolean
	setShowDelete: (isShown: boolean) => void
	showComplete: boolean
	setShowComplete: (isShown: boolean) => void
}

const TaskPopUps: FC<TaskPopUpsProps> = ({
	showAdd,
	setShowAdd,
	showDelete,
	setShowDelete,
	showComplete,
	setShowComplete
}) => {
	let addTimeoutId = useRef<ReturnType<typeof setTimeout>>()
	let deleteTimeoutId = useRef<ReturnType<typeof setTimeout>>()
	let completeTimeoutId = useRef<ReturnType<typeof setTimeout>>()

	const popUps: IPopUp[] = [
		{
			title: '✅ Task was successfully added!',
			isOpen: showAdd,
			setIsOpen: setShowAdd,
			handlePopUp: () => handlePopUp(addTimeoutId, setShowAdd),
			color: '#2d9f32'
		},
		{
			title: '⛔️ Task was successfully deleted!',
			isOpen: showDelete,
			setIsOpen: setShowDelete,
			handlePopUp: () => handlePopUp(deleteTimeoutId, setShowDelete),
			color: '#dc4236'
		},
		{
			title: '🚀 Task was successfully completed!',
			isOpen: showComplete,
			setIsOpen: setShowComplete,
			handlePopUp: () => handlePopUp(completeTimeoutId, setShowComplete),
			color: 'yellowgreen'
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

export default TaskPopUps
