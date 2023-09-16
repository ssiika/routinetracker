import React from 'react'
import { GroupedData, GraphData } from '../types'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

function Graph({data, color, yAxisFilter}: {data: GroupedData[], color: string, yAxisFilter: string}) {

    const months: [string, number][] = [['Jan', 31], ['Feb', 28], ['Mar', 31], ['Apr', 30], ['May', 31], ['Jun', 30], 
    ['Jul', 31], ['Aug', 31], ['Sep', 30], ['Oct', 31], ['Nov', 30], ['Dec', 31]]

    // Fix issue with activities with no data displaying data for activity1
    const graphData: GraphData[] = months.map((_month, index) => {
        const monthData = data.find((data) => data.month - 1 === index) 
        if (monthData) {
            return {total: monthData.total, avg: monthData.avg}
        } else {
            return {total: 0, avg: 0}
        }
    })

    const formattedData = {
        labels: months.map((month) => month[0]),
        datasets: [{
            label: "Time spent (minutes)",
            data: graphData.map((obj) => {
                if (yAxisFilter === 'total') return obj.total
                else /* yAxisFilter === 'avg' */ return obj.avg
            }),
            backgroundColor: [`rgb(${color})`]
        }]
    }

    

    return (
        <div className='graphDiv'>
            <Bar data={formattedData} />
        </div>
    )
}

export default Graph