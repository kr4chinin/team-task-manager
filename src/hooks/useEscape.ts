import { useEffect } from 'react'

export const useEscape = (setIsActive: (isActive: boolean) => void) => {
	useEffect(() => {
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				setIsActive(false)
			}
		})
		return () =>
			document.removeEventListener('keydown', e => {
				if (e.key === 'Escape') {
					setIsActive(false)
				}
			})
	}, [setIsActive])
}
