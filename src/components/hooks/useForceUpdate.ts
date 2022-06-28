import { useState, useCallback } from 'react'

export default function useForceUpdate() {
    const [state, setState] = useState({})

    return useCallback(() => {
        setState({})
    }, [])
}