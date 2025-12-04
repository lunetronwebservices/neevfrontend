"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "../slices/authSlice";
import orderReducer from "../slices/orderSlice";
import organizationReducer from "../slices/organizationSlice";
import paymentReducer from "../slices/paymentSlice";
import orderListReducer from "../slices/orderListSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        orderList: orderListReducer,
        organization: organizationReducer,
         payments: paymentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
