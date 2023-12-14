import React from 'react';
import { Bar } from 'react-chartjs-2';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';

Chart.register(...registerables);

const TypingStatsChart = ({ typingSpeed, accuracy }) => {
    const data = {
        labels: ['Speed', 'Accuracy'],
        datasets: [
            {
                label: 'Speed',
                data: [typingSpeed],
                backgroundColor: ['rgba(75,192,192,0.2)'],
                borderColor: ['rgba(75,192,192,1)'],
                borderWidth: 2,
            },
            {
                label: 'Accuracy',
                data: [accuracy],
                backgroundColor: ['rgba(255,99,132,0.2)'],
                borderColor: ['rgba(255,99,132,1)'],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="mt-5 w-6/12">
            <Bar data={data} options={options} />
        </div>
    );
};

export default TypingStatsChart;