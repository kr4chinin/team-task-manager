import { useState } from "react"
import axios from "axios"

export function useFetching<T>(URL: string, setValue: (data: T[]) => void) {

    const [isLoading, setIsLoading] = useState(false)

    async function fetch() {
        setIsLoading(true)
		const response = await axios.get(URL)
        setIsLoading(false)
		setValue(response.data)
	}

    return {
        execute: fetch,
        loading: isLoading
    }
}