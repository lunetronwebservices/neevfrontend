import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getPayments } from "@/services/payment.service";

export interface PaymentState {
    list: any[];
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchPaymentsThunk = createAsyncThunk<any[], void>(
    "payments/list",
    async (_, thunkAPI) => {
        try {
            const res = await getPayments();
            // Handle paginated responses (results key) or direct array
            const data = res.data?.results ?? res.data ?? [];
            return Array.isArray(data) ? data : [];
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to fetch payments");
        }
    }
);

const paymentSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentsThunk.pending, (st) => {
                st.loading = true;
                st.error = null;
            })
            .addCase(fetchPaymentsThunk.fulfilled, (st, action: PayloadAction<any[]>) => {
                st.loading = false;
                st.list = action.payload;
            })
            .addCase(fetchPaymentsThunk.rejected, (st, action: PayloadAction<any>) => {
                st.loading = false;
                st.error = action.payload;
            });
    },
});

export default paymentSlice.reducer;
