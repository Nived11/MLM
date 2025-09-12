import React from 'react';
import dolar from "../../../assets/images/dolar.png";

const TotalReferralIncome: React.FC = () => {
    return (
        <section className='pl-6 pb-3 mr-4 sm:mr-12'>
            <div className="flex items-center lg:ml-6 lg:mt-3">
                <div className="">
                    <img
                        src={dolar}
                        alt="Background Money"
                        className="w-12 h-12  rounded-full absolute"
                    />
                    <span className="text-2xl font-bold text-white ml-20">0</span>
                </div>
            </div>
        </section>
    );
};

export default TotalReferralIncome;