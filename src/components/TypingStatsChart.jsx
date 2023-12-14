import React from 'react';
import { Bar } from 'react-chartjs-2';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';

Chart.register(...registerables);

const getSpeedLevel = (typingSpeed) => {
    if (typingSpeed >= 0 && typingSpeed < 10) {
        return "Beginner";
    } else if (typingSpeed >= 10 && typingSpeed < 20) {
        return "Novice";
    } else if (typingSpeed >= 20 && typingSpeed < 40) {
        return "Intermediate";
    } else if (typingSpeed >= 40 && typingSpeed < 60) {
        return "Advanced";
    } else {
        return "Pro";
    }
};

const TypingStatsChart = ({ typingSpeed }) => {
    const speedLevel = getSpeedLevel(typingSpeed);

    const data = {
        labels: ['Speed'],
        datasets: [
            {
                label: 'Speed',
                data: [typingSpeed],
                backgroundColor: '#6d28d920',
                borderColor: '#6d28d9',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        animation: {
            duration: 2000,
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 60,
            },
        },
    };

    return (
        <div className="mt-5 w-6/12 text-center">
            <p className='text-white text-2xl font-bold'>Speed Level: <span className='text-transparent bg-clip-text bg-gradient-to-b from-violet-800 to-purple-500'> {speedLevel}</span></p>
            <Bar data={data} options={options} />
        </div>
    );
};

export default TypingStatsChart;
