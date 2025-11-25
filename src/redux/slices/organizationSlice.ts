import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrganizations } from '@/services/organization.service';
import { Organization } from "@/lib/types/organization";

export const fetchOrganizations = createAsyncThunk(
    "organization/fetch",
    async (_, thunkAPI) => {
        try {
            const res = await getOrganizations();
            return res.data as Organization[];
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message || "Failed to fetch organizations");
        }
    }
);

interface OrganizationState {
    list: Organization[];
    loading: boolean;
    error: string | null;
}

const initialState: OrganizationState = {
    list: [],
    loading: false,
    error: null,
};

const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default organizationSlice.reducer;
