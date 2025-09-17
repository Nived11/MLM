import React from 'react';
// import dolar from "../../../assets/images/dolar.png";
import { DollarSign } from 'lucide-react';


const TotalReferralIncome: React.FC = () => {
    return (
        <div className="flex items-center">
            {/* <img
                src={dolar}
                alt="Background Money"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            /> */}
            <DollarSign size={24} className="sm:size-[28px] text-yellow-400" />

            <span className="text-2xl font-bold text-white ml-4">0</span>
        </div>
    );
};

export default TotalReferralIncome;