import { createSlice } from '@reduxjs/toolkit';

export type UserType = {
    user_id: string;
}

interface AuthState {
    user: UserType | null;
    loading: boolean;
    error: string | null;
    checked: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
    checked: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.checked = true;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
            state.checked = true;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.checked = true
        },
    },

});

export const { setAuth, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;