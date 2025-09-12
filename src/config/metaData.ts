import { APP_NAME } from "../utils/contant";

const metaData = {
    home: {
        title: `Home | ${APP_NAME}`,
        description: "Welcome to the homepage.",
    },
    about: {
        title: `About Us | ${APP_NAME}`,
        description: "Learn more about our mission and values.",
    },
    contact: {
        title: `Contact | ${APP_NAME}`,
        description: "Reach out to our team with your inquiries.",
    },
    dashboard: {
        title: `Dashboard | ${APP_NAME}`,
        description: "Reach out to our team with your inquiries.",
    },
    help: {
        title: `Send Help | ${APP_NAME}`,
        description: "Reach out to our team for send help.",
    },
    wallet: {
        title: `Wallet | ${APP_NAME}`,
        description: "Manage your earnings seamlessly with the Club Wallet. View balances, redeem requests, track transactions, and enjoy secure withdrawals.",
    },
    rebirthUsers: {
        title: `Rebirth-Users | ${APP_NAME}`,
        description: "Manage user rebirths and re-entries in your MLM network. View status, placement history, and trigger new cycles securely from a unified dashboard.",
    },
    sendHelp: {
        title: `Send-Help | ${APP_NAME}`,
        description: "Send Help is an MLM software that automates referrals, tracks commissions, and scales your network marketing with real-time dashboards and secure payouts."
    },
    Report: {
        title: `Report |${APP_NAME} `,
        description: "Reach out to our team with your inquiries.",
    }
};

export type PageName = keyof typeof metaData;

export type MetaData = {
    title: string;
    description: string;
};

export function getMeta(
    pageName: PageName,
    overrides: Partial<MetaData> = {}
): MetaData {
    const defaultMeta = metaData[pageName] ?? {
        title: APP_NAME,
        description: "Description",
    };

    return {
        ...defaultMeta,
        ...overrides,
    };
}
