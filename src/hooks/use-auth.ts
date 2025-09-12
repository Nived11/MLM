import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setError, setLoading } from "../slices/authSlice";
import api from "../lib/api";
import type { RootState } from "../store";


export const useUser = () => {
    const dispatch = useDispatch();
    const { user, loading, checked } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            try {
                const res = await api.get("/me/", { withCredentials: true });

                const data = res.data;
                if (data) {
                    dispatch(setAuth(data));
                }
                else {
                    throw Error("Unauthorised")
                }
            } catch (err: any) {
                dispatch(setAuth(null));
                dispatch(setError(err.response?.data?.message || "Not authenticated"));
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (!checked) {
            checkAuth()
        }
    }, []);

    return { user, loading, checked };
}