import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DailyIncomeChart = () => {
    // Data for the chart, based on your provided values
    const chartData = [
        { day: '13', income: 300 },
        { day: '14', income: 450 },
        { day: '15', income: 1200 },
        { day: '16', income: 800 },
        { day: '17', income: 1500 }
    ];

    const data = {
        labels: chartData.map(d => d.day),
        datasets: [
            {
                label: 'Income',
                data: chartData.map(d => d.income),
                borderColor: '#7129DD',
                backgroundColor: '#1D1436',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
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
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#9ca3af'
                    ,
                },
                border: {
                    display: false,
                }
            },
            y: {
                display: true,
                grid: {
                    color: '#FFFFFF17',
                },
                ticks: {
                    color: '#9ca3af',
                    stepSize: 250,
                    callback: function (value: any) {
                        return value === 0 ? '' : value;
                    }
                },
                border: {
                    display: false,
                },
                beginAtZero: true,
                max: 1500
            },
        },
    };

    return (
        <div className="bg-[#121021] rounded-xl p-4 sm:p-6  shadow-md ">
            <h3 className="text-white text-lg font-semibold mb-6">Daily Income / Expenses</h3>
            <div className="h-40 sm:h-60 mb-6 sm:mr-10 sm:mt-10 sm:ml-4">
                <Line data={data} options={options} />
            </div>
            {/* Legend */}
            <div className="flex flex-col space-x-6">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm sm:ml-4 mr-8">Income</span>
                    <div className="w-34 h-2 bg-[#7129DD] rounded"></div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm sm:ml-4 mr-4">Expenses</span>
                    <div className="w-34 h-2 bg-[#7129DD]  rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default DailyIncomeChart;