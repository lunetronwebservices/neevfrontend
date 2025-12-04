
"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DataTable from "@/components/tables/data-table/DataTable";
import { ColumnDef } from "@/lib/types/data-table-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentsThunk } from "@/redux/slices/paymentSlice";
import { RootState, AppDispatch } from "@/redux/store/store";

type Payment = {
  id: number;
  order_id?: number;
  amount: number;
  method?: string;
  status?: string;
  created_at?: string;
};

export default function PaymentsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    dispatch(fetchPaymentsThunk());
  }, [dispatch]);

  const columns: ColumnDef<Payment>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "order_id", label: "Order ID", sortable: true },
    { key: "amount", label: "Amount", sortable: true, render: (row) => `$${(Number(row.amount) || 0).toFixed(2)}` },
    { key: "method", label: "Method", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "created_at", label: "Created At", sortable: true, render: (row) => row.created_at ? new Date(row.created_at).toLocaleString() : "-" },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Payments" />

      <ComponentCard title="Payments List">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{String(error)}</div>
        ) : (
          <DataTable
            columns={columns}
            data={list}
            defaultPageSize={5}
            pageSizeOptions={[5, 10, 20]}
          />
        )}
      </ComponentCard>
    </div>
  );
}
