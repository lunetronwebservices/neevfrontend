// "use client";

// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// interface AuthState {
//     token: string | null;
//     role: "organization" | "admin" | "operation" | "user" | null;
//     user: any | null;
//     isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//     token: Cookies.get("token") || null,
//     role: (Cookies.get("role") as AuthState["role"]) || null,
//     user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,
//     isAuthenticated: !!Cookies.get("token"),
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         loginSuccess: (state, action) => {
//             const { token, role, user } = action.payload;

//             state.token = token;
//             state.role = role;
//             state.user = user;
//             state.isAuthenticated = true;

//             Cookies.set("token", token);
//             Cookies.set("role", role);
//             Cookies.set("user", JSON.stringify(user));
//         },

//         logout: (state) => {
//             state.token = null;
//             state.role = null;
//             state.user = null;
//             state.isAuthenticated = false;

//             Cookies.remove("token");
//             Cookies.remove("role");
//             Cookies.remove("user");
//         },
//     },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, logoutService, getProfileService, getToken } from "@/services/auth.service";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        { email, password }: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const res = await loginService({ email, password });

            // Django returns:
            // { token: "...", role: "admin", user: {...} }

            return res; // full response data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.error || "Login failed");
        }
    }
);

// FETCH PROFILE (Optional)
export const fetchProfile = createAsyncThunk(
    "auth/profile",
    async (_, thunkAPI) => {
        try {
            const res = await getProfileService();
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err?.error || "Profile load failed");
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null as any,
        role: null as any,
        token: getToken() || null,
        loading: false,
        error: null as any,
    },
    reducers: {
        logout(state) {
            logoutService();
            state.user = null;
            state.role = null;
            state.token = null;
            state.error = null;
        },
        setUser(state, action) {
            state.user = action.payload?.user || null;
            state.role = action.payload?.role || null;
        },
    },
    extraReducers: (builder) => {
        builder

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: any) => {
                state.loading = false;
                state.user = action.payload.user;
                state.role = action.payload.role;
                state.token = getToken() || null;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

            // PROFILE
            .addCase(fetchProfile.fulfilled, (state, action: any) => {
                state.user = action.payload?.user;
                state.role = action.payload?.role;
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
