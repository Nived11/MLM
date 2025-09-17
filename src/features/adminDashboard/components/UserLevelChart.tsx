import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const UserLevelChart = () => {
    const levelData = [
        { level: '1', users: 5 },
        { level: '2', users: 14 },
        { level: '9', users: 19 },
        { level: '4', users: 11 },
        { level: '5', users: 6 }
    ];

    const data = {
        labels: levelData.map(d => d.level),
        datasets: [
            {
                label: 'Users',
                data: levelData.map(d => d.users),
                backgroundColor: ' #7129DD',
                borderRadius: 4,
            }
        ]
    };
    const tooltipMode: "index" | "dataset" | "point" | "nearest" | "x" | "y" = "index";

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: tooltipMode,
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#9ca3af',
                },
                border: {
                    display: false,
                }
            },
            y: {
                grid: {
                    color: '#FFFFFF17',
                },
                ticks: {
                    color: '#9ca3af',
                    stepSize: 5,
                    callback: function (value: any) {
                        return value === 0 ? '0' : value;
                    }
                },
                border: {
                    display: false,
                },
                beginAtZero: true,
                max: 20
            },
        },
    };

    return (
        <div className="bg-[#121021] rounded-xl sm:p-6 p-4 shadow-md">
            <h3 className="text-white text-lg font-semibold mb-6">New Users by Level</h3>
            <div className="sm:h-60 h-40  mb-6 sm:mr-10 sm:mt-10 sm:ml-4">
                <Bar data={data} options={options} />
            </div>
            {/* Legend */}
            <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm sm:ml-4 mr-4">Income</span>
                <div className="w-34 h-2 bg-[#7129DD] rounded"></div>
            </div>
        </div>
    );
};

export default UserLevelChart;