import React, { useState } from 'react'
import { GroupedData, GraphData } from '../types'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

function Graph({data, color}: {data: GroupedData[], color: string}) {

    const months: [string, number][] = [['Jan', 31], ['Feb', 28], ['Mar', 31], ['Apr', 30], ['May', 31], ['Jun', 30], 
    ['Jul', 31], ['Aug', 31], ['Sep', 30], ['Oct', 31], ['Nov', 30], ['Dec', 31]]

    // Fix issue with activities with no data displaying data for activity1
    const graphData: GraphData[] = months.map((_month, index) => {
        const monthData = data.find((data) => data.month === index) 
        if (monthData) {
            return {total: monthData.total, avg: monthData.avg}
        } else {
            return {total: 0, avg: 0}
        }
    })

    const formattedData = {
        labels: months.map((month) => month[0]),
        datasets: [{
            label: "Time spent",
            data: graphData.map((obj) => obj.total)
        }]
    }

    

    return (
        <div>
            <Bar data={formattedData} />
        </div>
    )
}

export default Graph