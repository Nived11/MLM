import { Route } from "react-router";
import SidebarLayout from "../layouts/SidebarLayout";
import { Dashboard, RebirthUsers, RebirthSearch, RebirthInviteForm, Wallet, RebirthAll, SendHelp, SendHelpPay,
  ReportUserJoining, ReportSendRequest,ReportAuc,ReportPayoutRequest,ReportBonusSummary,ReportLevelUser ,ReportRebirthUsers
} from "../pages";

import Profile from "../features/Profile/components/profile";
import Account from "../features/Profile/components/account";
import KYCForm from "../features/Profile/components/kyc";
import SecuritySettings from "../features/Profile/components/security";
import Referral from "../features/Profile/components/referal";
import NetworkPage from "../features/Network/components/network";

const SidebarRoute = () => {
  return (
    <Route element={<SidebarLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/send-help" element={<SendHelp />} />
      <Route path="/send-help/payment" element={<SendHelpPay />} />
      <Route path="/wallet" element={<Wallet />} />

      <Route path="/rebirth-users">
        <Route index element={<RebirthUsers />} />
        <Route path="search" element={<RebirthSearch />} />
        <Route path="invite-form" element={<RebirthInviteForm />} />
        <Route path="all-users" element={<RebirthAll />} />
      </Route>

      <Route path="/report">
        <Route index element={<ReportUserJoining />} />
        <Route path="user-joining" element={<ReportUserJoining />} />
        <Route path="send-request" element={<ReportSendRequest />} />
        <Route path="auc-report" element={<ReportAuc />} />
        <Route path="payout-request" element={<ReportPayoutRequest />} />
        <Route path="bonus-summary" element={<ReportBonusSummary />} />
        <Route path="level-users" element={<ReportLevelUser />} />
        <Route path="rebirth-users" element={<ReportRebirthUsers />} />
      </Route>

      <Route path="/profile">
        <Route index element={<Profile />} />
        <Route path="account" element={<Account />} />
        <Route path="kyc" element={<KYCForm />} />
        <Route path="security" element={<SecuritySettings />} />
        <Route path="referral" element={<Referral />} />
      </Route>

      <Route path="/networks">
        <Route path="hierarchical-view" element={<NetworkPage />} />
      </Route>
    </Route>
  );
};

export default SidebarRoute;
