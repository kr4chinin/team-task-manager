import { createContext, FC, useContext, useState } from 'react'

const ModalContext = createContext<any>(null)

export const useModalContext = () => {
	return useContext(ModalContext)
}

interface ModalContextProviderProps {
	children: React.ReactNode
}

export const ModalContextProvider: FC<ModalContextProviderProps> = ({
	children
}) => {
	const [isUserOpen, setIsUserOpen] = useState(false)
	const [isTaskOpen, setIsTaskOpen] = useState(false)

	return (
		<ModalContext.Provider
			value={{
				isUserOpen,
				setIsUserOpen,
				isTaskOpen,
				setIsTaskOpen
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
