import { useCallback, useState } from 'react'
import axios from 'axios'

export function useFetching<T>(URL: string, setValue: (data: T[]) => void) {
	const [isLoading, setIsLoading] = useState(false)

	const fetch = useCallback(async () => {
		setIsLoading(true)
		const response = await axios.get(URL)
		setIsLoading(false)
		setValue(response.data)
	}, [URL, setValue])

	return {
		execute: fetch,
		loading: isLoading
	}
}