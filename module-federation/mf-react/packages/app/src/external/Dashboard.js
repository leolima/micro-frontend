import { importRemote } from 'module-federation-import-remote'
import React, { useRef, useEffect } from 'react'

export default (props) => {
    const ref = useRef(null);
    
    useEffect(() => {
        importRemote({ url: "http://localhost:9005", scope: 'DashboardApp', module: 'DashboardPage' })
            .then(({mount}) => {
                mount(ref.current, props)
        });
    }, [])

    return <div ref={ref} />
}
