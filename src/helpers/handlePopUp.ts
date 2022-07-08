import React from 'react'

export function handlePopUp(
	timeout: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>,
	setShowPopUp: (showPopUp: boolean) => void
) {
	if (timeout.current) {
		clearTimeout(timeout.current)
	}
	setShowPopUp(true)
	timeout.current = setTimeout(() => {
		setShowPopUp(false)
	}, 1500)
}
