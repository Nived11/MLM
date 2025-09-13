import Icon1 from "../components/icons/Icon1";
import Icon2 from "../components/icons/Icon2";
import Icon3 from "../components/icons/Icon3";
import Icon4 from "../components/icons/Icon4";
import Icon5 from "../components/icons/Icon5";
import Icon6 from "../components/icons/Icon6";
import Icon7 from "../components/icons/Icon7";

export const sidebarItems = [
    { id: 1, label: "Dashboard", icon: Icon1, path: "/dashboard" },
    { id: 2, label: "Send Help", icon: Icon2, path: "/send-help" },
    { id: 3, label: "Club wallet", icon: Icon3, path: "/club-wallet" },
    { id: 4, label: "Rebirth Users", icon: Icon4, path: "/rebirth-users" },
    { id: 5, label: "Network", icon: Icon5, path: "/network" },
    { id: 6, label: "Report", icon: Icon6, path: "/report" },
    { id: 7, label: "Logout", icon: Icon7, path: "/logout" },
];

export const APP_NAME = "WINNERS CLUB"


export const menuLinks = [
    {
        id: 1,
        label: "Dashboard",
        path: '/dashboard'
    },
    {
        id: 2,
        label: "Receive Requests",
        path: '/receive-requests'
    },
    {
        id: 3,
        label: "Profile",
        path: '/profile'
    },
    {
        id: 4,
        label: "Send Help",
        path: '/send-help'
    },
    {
        id: 5,
        label: "Club Wallet",
        path: '/wallet'
    },
    {
        id: 6,
        label: "Rebirth Users",
        path: "/rebirth-users",
        links: [
            {
                id: 61,
                label: "Search",
                path: "/rebirth-users/search",
            },
            {
                id: 62,
                label: "Invite Form",
                path: "/rebirth-users/invite-form",
            },
            {
                id: 63,
                label: "All Users",
                path: "/rebirth-users/all-users",
            },
        ],
    }
    ,
    {
        id: 7,
        label: "Networks",
        path: '/networks',
        links: [{
            id: 71,
            label: "Hierarchical view",
            path: '/networks/hierarchical-view',
        }]
    },
    {
        id: 8,
        label: "Reports",
        path: "/report",
        links: [
            {
                id: 81,
                label: "User Joining",
                path: "/report/user-joining",
            },
            {
                id: 82,
                label: "Send Request",
                path: "/report/send-request",
            },
            {
                id: 83,
                label: "AUC Report",
                path: "/report/auc-report",
            },
            {
                id: 84,
                label: "Payout Request",
                path: "/report/payout-request",
            },
            {
                id: 85,
                label: "Bonus Summary",
                path: "/report/bonus-summary",
            },
            {
                id: 86,
                label: "Level Users",
                path: "/report/level-users",
            },
            {
                id: 87,
                label: "Rebirth Users",
                path: "/report/rebirth-user",
            },
        ],
    }


]
