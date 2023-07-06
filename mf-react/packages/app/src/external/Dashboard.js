import { mount } from 'DashboardApp/DashboardPage'
import React, { useRef, useEffect } from 'react'

export default (props) => {
    const ref = useRef(null);
    
    useEffect(() => {
        mount(ref.current, props)
    }, [])

    return <div ref={ref} />
}
