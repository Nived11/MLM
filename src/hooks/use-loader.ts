import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "./use-auth";

export const useGlobalLoader = () => {
    const { loading, checked, user } = useUser();
    const [showLoader, setShowLoader] = useState(true);
    const [minDurationPassed, setMinDurationPassed] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => setMinDurationPassed(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading && checked && minDurationPassed) {
            setShowLoader(false);
        }
    }, [loading, checked, minDurationPassed]);

    return {
        user,
        loading,
        checked,
        showLoader: showLoader && (!pathname.includes("login")),
    };
};
