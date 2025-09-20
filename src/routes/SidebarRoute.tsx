import { Route } from "react-router";
import SidebarLayout from "../layouts/SidebarLayout";
import {
  Dashboard,
  RebirthUsers,
  RebirthSearch,
  RebirthInviteForm,
  Wallet,
  RebirthAll,
  SendHelp,
  SendHelpPay,
  ReportAuc,
  ReportBonusSummary,
  ReportLevelUser,
  ReportPayoutRequest,
  ReportRebirthUsers,
  ReportSendRequest,
  ReportUserJoining,
  ProfileDetails,
  ProfileAccount,
  ProfileKyc,
  ProfileSecurity,
  ProfileReferral,
  UserNetwork,
} from "../pages/user";


const SidebarRoute = () => {
  return (
    <Route element={<SidebarLayout />}>
      <Route path="/dashboard" element={<Dashboard />} /> {/* Shabana */}
      <Route path="/send-help" element={<SendHelp />} /> {/* Abhitha */}
      <Route path="/send-help/payment" element={<SendHelpPay />} />{" "}
      {/* Abhitha */}
      <Route path="/wallet" element={<Wallet />} /> {/* Abhitha */}
      
      <Route path="/rebirth-users">
        {/* Abhitha */}
        <Route index element={<RebirthUsers />} />
        <Route path="search" element={<RebirthSearch />} />
        <Route path="invite-form" element={<RebirthInviteForm />} />
        <Route path="all-users" element={<RebirthAll />} />
      </Route>

      <Route path="/report">
        {" "}
        {/* Nived */}
        <Route index element={<ReportUserJoining />} />
        <Route path="user-joining" element={<ReportUserJoining />} />
        <Route path="send-request" element={<ReportSendRequest />} />
        <Route path="auc-report" element={<ReportAuc />} />
        <Route path="payout-request" element={<ReportPayoutRequest />} />
        <Route path="bonus-summary" element={<ReportBonusSummary />} />
        <Route path="level-users" element={<ReportLevelUser />} />
        <Route path="rebirth-user" element={<ReportRebirthUsers />} />
      </Route>
      <Route path="/profile">
        {" "}
        {/* Arathi */}
        <Route index element={<ProfileDetails />} />
        <Route path="account" element={<ProfileAccount />} />
        <Route path="kyc" element={<ProfileKyc />} />
        <Route path="security" element={<ProfileSecurity />} />
        <Route path="referral" element={<ProfileReferral />} />
      </Route>
      <Route path="/networks">
        {" "}
        {/* Arathi */}
        <Route path="hierarchical-view" element={<UserNetwork />} />
      </Route>
    </Route>
  );
};

export default SidebarRoute;
