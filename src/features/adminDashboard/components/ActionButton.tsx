import React from 'react';

const ActionButton: React.FC = () => {
    const buttons = [
        {
            label: 'Manage Users', color:
                'bg-[#470BBE] hover:bg-[#3a05a2ff]'
        },
        {
            label: 'View Reports', color:
                'bg-[#470BBE] hover:bg-[#3a05a2ff]'
        },
        {
            label: 'Approve Payments', color:
                'bg-[#470BBE] hover:bg-[#3a05a2ff]'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 sm:gap-6 gap-3 mb-10">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    className={`${button.color} text-white text-sm sm:text-lg sm:px-8 py-3 rounded-lg font-medium transition-colors duration-200`}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default ActionButton;