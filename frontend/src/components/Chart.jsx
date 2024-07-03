import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetDashboardChart } from '../redux/project/project.action';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: '',
        },
    },
};

const Chart = () => {
    const [data, setData] = useState([]);

    const labels = data.map((el) => el.department.slice(0, 5));

    const chartdata = {
        labels,
        datasets: [
            {
                label: 'Total',
                data: data.map((el) => el.registeredCount),
                backgroundColor: 'blue',
            },
            {
                label: 'Closed',
                data: data.map((el) => el.closedCount),
                backgroundColor: 'green',
            }
        ]
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetDashboardChart())
            .then((res) => setData(res))
            .catch((e) => console.log(e));
    }, [dispatch]);

    return (
        <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Department wise - Total Vs Closed</h2>
            <div className="w-full md:w-1/2 bg-white rounded-lg p-6 shadow-lg">
                <Bar options={options} data={chartdata} />
            </div>
        </div>
    );
}

export default Chart;
