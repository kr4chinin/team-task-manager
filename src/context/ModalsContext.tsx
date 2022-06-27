import { createContext, FC, useContext, useState } from 'react'

const ModalsContext = createContext<any>(null)

export const useModalsContext = () => {
	return useContext(ModalsContext)
}

interface ModalsContextProviderProps {
	children: React.ReactNode
}

export const ModalsContextProvider: FC<ModalsContextProviderProps> = ({
	children
}) => {
	const [isUserOpen, setIsUserOpen] = useState(false)

	return (
		<ModalsContext.Provider
			value={{
				isUserOpen,
				setIsUserOpen
			}}
		>
			{children}
		</ModalsContext.Provider>
	)
}
