import Meta from "../../components/custom-ui/Meta";
import EarningUsers from "../../features/LandingPage/Components/EarningUser";
import RebirthUsers from "../../features/LandingPage/Components/RebirthUser";
import ReferralLink from "../../features/LandingPage/Components/ReferralLink";
import StatsDashboard from "../../features/LandingPage/Components/StatusDash";
import TotalReferralIncome from "../../features/LandingPage/Components/TotalReferalIncome";
import UserLevel from "../../features/LandingPage/Components/UserLevel";
import LevelUserCount from "../../features/LandingPage/Components/UserLevelCount"
import UserActivity from "../../features/LandingPage/Components/UserActivity";

const Dashboard = () => {
  return (
    <div className="md:mt-10 sm:ml-2 max-w-full overflow-hidden ">
      <Meta page="dashboard" />

      <div className="ml-6 mr-6 mt-2 sm:mr-6 ">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4">Earning Users</h3>
        <div className="space-y-6">
          <EarningUsers />
          <StatsDashboard />
        </div>
      </div>

      <div className="ml-6 mr-6 mt-4 sm:mr-6 sm:mt-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4">Level User Count</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LevelUserCount />
          <ReferralLink />
        </div>
      </div>

      <div className="ml-6 mr-0 mt-4 sm:mr-0 sm:mt-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 lg:mb-5">User Level</h3>
        <UserLevel />
      </div>

      <div className="ml-6 mr-6 mt-2 sm:mr-6 sm:mt-6 mb-3 ">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4">Total Referral Income</h3>
        <TotalReferralIncome />
      </div>

      <div className="ml-6 mr-6 mt-2 sm:mr-6 sm:mt-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 ">Rebirth Users</h3>
        <RebirthUsers />
      </div>

      <div className="ml-6 mr-6 mt-4 sm:mr-6 sm:mt-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white  mb-4">User Activity</h3>
        <UserActivity />
      </div>
    </div>

  );
};

export default Dashboard;
