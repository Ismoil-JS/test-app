import React, { useEffect, useState } from 'react'
import c from './Main.module.scss'
import axios from 'axios'

const Main = () => {

    const [data, setData] = useState([])

    //  This is for fetch, I know how to use fetch, but I want to use axios

    // useEffect(() => {
    //     fetch('https://restcountries.com/v2/all?fields=name,region,area')
    //         .then(res => res.json())
    //         .then(res => {
    //             setData(res)
    //         })
    // }, [])

    // This is for axios

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name,region,area')
            .then(res => {
                setData(res.data)
            })
    }, [])

    console.log(data);
    return (
        <div> <div className={c.container}>Hain</div></div>
    )
}

export default Main