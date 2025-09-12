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
  Report,
} from "../pages";
import {
  AucReport,
  BonusSummary,
  LevelUsers,
  PayoutRequest,
  SendRequest,
  UserJoining,
  ReportRebirthUsers,
} from "../features/Reports";

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
        <Route index element={<Report />} />
        <Route path="user-joining" element={<UserJoining />} />
        <Route path="send-request" element={<SendRequest />} />
        <Route path="auc-report" element={<AucReport />} />
        <Route path="payout-request" element={<PayoutRequest />} />
        <Route path="bonus-summary" element={<BonusSummary />} />
        <Route path="level-users" element={<LevelUsers />} />
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
