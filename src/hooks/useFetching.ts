import { useCallback, useState } from 'react'
import axios from 'axios'
import { getErrorMessage } from '../helpers/getErrorMessage'

type status = 'default' | 'loading' | 'error'

export function useFetching<T>(URL: string, setValue: (data: T[]) => void) {
    const [status, setStatus] = useState<status>('default')

    const fetch = useCallback(async () => {
        try {
            setStatus('loading')
            const response = await axios.get(URL)
            setStatus('default')
            setValue(response.data)
        } catch (e) {
            setStatus('error')
            console.error('Fetching error', getErrorMessage(e))
        }
	}, [URL, setValue])

    return {
        execute: fetch,
        status: status
    }
}