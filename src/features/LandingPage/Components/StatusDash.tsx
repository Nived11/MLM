import React from 'react';
import {
  DollarSign,
  ArrowDownToLine,
  ArrowUpToLine,
  Inbox,
  Clock,
  Users
} from 'lucide-react';

interface StatsCard {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const StatsDashboard: React.FC = () => {
  const statsData: StatsCard[] = [
    { icon: <DollarSign size={20} className="text-yellow-400 sm:size-[32px]" />, title: 'Total Income', value: '0' },
    { icon: <ArrowDownToLine size={20} className="text-yellow-400 sm:size-[32px]" />, title: 'Send Help', value: '5200' },
    { icon: <Inbox size={20} className="text-yellow-400 sm:size-[32px]" />, title: 'Receive Help', value: '0' },
    { icon: <ArrowUpToLine size={20} className="text-yellow-400 sm:size-[32px]" />, title: 'Pending Send Count', value: '5' },
    { icon: <Clock size={20} className="text-yellow-400 sm:size-[32px]" />, title: 'Processing Receive Count', value: '0' },
    { icon: <Users size={20} className="text-yellow-400 sm:size-[32px]" />, title: 'Referral Count', value: '0' }
  ];

  return (
    <section className='mr-4 sm:mr-12'>
      <div className="rounded-2xl rounded-br-2xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2">
        <div className="rounded-2xl rounded-br-2xl bg-black p-3 sm:p-6 lg:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="relative bg-black rounded-tl-2xl rounded-br-2xl border border-yellow-300 
                         p-3 sm:p-5 lg:p-8 min-h-[100px] sm:min-h-[150px] lg:min-h-[170px] 
                         flex flex-col justify-between"
              >

                <div className="flex justify-between items-start">
                  <span className="text-sm xs:text-base sm:text-2xl lg:text-4xl font-bold text-white">
                    {stat.value}
                  </span>
                </div>

                <div className="mt-2 sm:mt-6 lg:mt-8 flex justify-between items-center">
                  <span className="text-[10px] xs:text-xs sm:text-lg lg:text-xl font-semibold text-white block">
                    {stat.title}
                  </span>
                  <span className="flex-shrink-0">

                    <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-yellow-400">
                      {stat.icon}
                    </div>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

}
  ;

export default StatsDashboard;