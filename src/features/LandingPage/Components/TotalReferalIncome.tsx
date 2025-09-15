import React from 'react';
import dolar from "../../../assets/images/dolar.png";

const TotalReferralIncome: React.FC = () => {
    return (
        <div className="flex items-center">
            <img
                src={dolar}
                alt="Background Money"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <span className="text-2xl font-bold text-white ml-4">0</span>
        </div>
    );
};

export default TotalReferralIncome;