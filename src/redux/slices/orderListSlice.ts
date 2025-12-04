import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "@/services/order.service";

export interface OrderListState {
    list: any[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderListState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchOrdersThunk = createAsyncThunk<any[], void>(
    "orderList/fetch",
    async (_, thunkAPI) => {
        try {
            const res = await getOrders();
            // Handle paginated responses (results key) or direct array
            const data = res.data?.results ?? res.data ?? [];
            return Array.isArray(data) ? data : [];
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to fetch orders");
        }
    }
);

const orderListSlice = createSlice({
    name: "orderList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersThunk.pending, (st) => {
                st.loading = true;
                st.error = null;
            })
            .addCase(fetchOrdersThunk.fulfilled, (st, action: PayloadAction<any[]>) => {
                st.loading = false;
                st.list = action.payload;
            })
            .addCase(fetchOrdersThunk.rejected, (st, action: PayloadAction<any>) => {
                st.loading = false;
                st.error = action.payload;
            });
    },
});

export default orderListSlice.reducer;
