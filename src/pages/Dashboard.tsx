import Meta from "../components/custom-ui/Meta";
import EarningUsers from "../features/LandingPage/Components/EarningUser";
import RebirthUsers from "../features/LandingPage/Components/RebirthUser";
import ReferralLink from "../features/LandingPage/Components/ReferralLink";
import StatsDashboard from "../features/LandingPage/Components/StatusDash";
import TotalReferralIncome from "../features/LandingPage/Components/TotalReferalIncome";
import UserLevel from "../features/LandingPage/Components/UserLevel";
import LevelUserCount from "../features/LandingPage/Components/UserLevelCount"
import UserActivity from "../features/LandingPage/Components/UserActivity";

const Dashboard = () => {
  return (
    <div className="md:mt-10  max-w-full overflow-hidden ">
      <Meta page="dashboard" />
      <div className="p-4 pr-0 pb-0">
        <h3 className="ml-4 lg:ml-6 mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-white ">Earning Users</h3>
        <div className="p-4 lg:p-6 space-y-6">
          <EarningUsers />
          <StatsDashboard />
        </div>
        <h3 className="ml-4 lg:ml-6 mt-2 lg:mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-white mb-8">Level User Count</h3>
        <div className="pl-4 lg:pl-6 pr-4 lg:pr-6  grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LevelUserCount />
          <ReferralLink />
        </div>
        <h3 className="ml-4 lg:ml-6 lg:mt-8 lg:mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-white lg:mb-5">User Level</h3>
        <UserLevel />
        <h3 className="ml-4 lg:ml-6 mt-2 lg:mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-white mb-8">Total Referral Income</h3>
        <TotalReferralIncome />
        <h3 className="ml-4 lg:ml-6 mt-9 lg:mt-10 text-lg sm:text-xl md:text-2xl font-semibold text-white lg:mb-5">Rebirth Users</h3>
        <RebirthUsers />
        <h3 className="ml-4 lg:ml-6 mt-5 mb-5 lg:mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-white lg:mb-5 lg:mt-8">User Activity</h3>
        <UserActivity />
      </div>
    </div>


  );
};

export default Dashboard;
