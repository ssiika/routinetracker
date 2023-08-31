import React from 'react'
import { GraphData } from '../types'

function Graph({data, filter, color = '0, 0, 0'}: {data: GraphData[], filter: string, color: string}) {

    const months: [string, number][] = [['Jan', 31], ['Feb', 28], ['Mar', 31], ['Apr', 30], ['May', 31], ['Jun', 30], 
    ['Jul', 31], ['Aug', 31], ['Sep', 30], ['Oct', 31], ['Nov', 30], ['Dec', 31]]

    return (
        <div>Graph</div>
    )
}

export default Graph