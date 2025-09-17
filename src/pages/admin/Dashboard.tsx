import Meta from "../../components/custom-ui/Meta";

import ActionButton from "../../features/adminDashboard/components/ActionButton";
import DailyIncomeChart from "../../features/adminDashboard/components/DailyIncomeChart";
import NewUserRegistrations from "../../features/adminDashboard/components/NewUserRegistration";
import RecentPayments from "../../features/adminDashboard/components/RecentPayment";
import StatusCards from "../../features/adminDashboard/components/StatusCard";
import UserLevelChart from "../../features/adminDashboard/components/UserLevelChart";
const Dashboard = () => {
  return (
    <div className="md:mt-10 sm:ml-6 max-w-250">
      <Meta page="dashboard" />

      <div className="ml-6 mr-6 mt-2 sm:mr-6 max-w-280">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4">Welcome Back, Admin</h3>
        <div className="space-y-6">
          <StatusCards />
        </div>
      </div>

      <div className="ml-6 mr-6 mt-4 sm:mr-6 sm:mt-6 max-w-280">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DailyIncomeChart />
          <UserLevelChart />
          <RecentPayments />
          <NewUserRegistrations />
        </div>
      </div>

      <div className="ml-6 mr-6 mt-4 sm:mr-6 sm:mt-10 sm:mb-12 max-w-280">
        <ActionButton />
      </div>
    </div>

  );
};

export default Dashboard;