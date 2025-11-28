import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createOrder,
    uploadDocument,
    sendSignatureRequest,
    makePayment,
    getInvoice,
} from "@/services/order.service";

// -----------------------
// TYPES
// -----------------------
export interface OrderState {
    order: any | null;
    invoice: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    order: null,
    invoice: null,
    loading: false,
    error: null,
};

// -----------------------
// ASYNC THUNKS
// -----------------------
export const createOrderThunk = createAsyncThunk<any, any>(
    "orders/create",
    async (payload, thunkAPI) => {
        try {
            const res = await createOrder(payload);
            return res.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to create order");
        }
    }
);

export const uploadDocumentThunk = createAsyncThunk<any, any>(
    "orders/uploadDocument",
    async ({ orderId, formData }, thunkAPI) => {
        try {
            const res = await uploadDocument(orderId, formData);
            return res.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Document upload failed");
        }
    }
);

export const sendSignatureThunk = createAsyncThunk<any, any>(
    "orders/sendSignature",
    async ({ orderId, payload }, thunkAPI) => {
        try {
            const res = await sendSignatureRequest(orderId, payload);
            return res.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Signature failed");
        }
    }
);

export const makePaymentThunk = createAsyncThunk<any, any>(
    "orders/payment",
    async ({ orderId, payload }, thunkAPI) => {
        try {
            const res = await makePayment(orderId, payload);
            return res.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Payment failed");
        }
    }
);

export const invoiceThunk = createAsyncThunk<any, number>(
    "orders/invoice",
    async (invoiceId, thunkAPI) => {
        try {
            const res = await getInvoice(invoiceId);
            return res.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Unable to fetch invoice");
        }
    }
);

// -----------------------
// SLICE
// -----------------------
const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Create Order
            .addCase(createOrderThunk.pending, (st) => {
                st.loading = true;
                st.error = null;
            })
            .addCase(createOrderThunk.fulfilled, (st, action: PayloadAction<any>) => {
                st.loading = false;
                st.order = action.payload;
            })
            .addCase(createOrderThunk.rejected, (st, action: PayloadAction<any>) => {
                st.loading = false;
                st.error = action.payload;
            })

            // Invoice
            .addCase(invoiceThunk.fulfilled, (st, action: PayloadAction<any>) => {
                st.invoice = action.payload;
            });
    },
});

export default orderSlice.reducer;
