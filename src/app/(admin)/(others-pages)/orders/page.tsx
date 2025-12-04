"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DataTable from "@/components/tables/data-table/DataTable";
import { ColumnDef } from "@/lib/types/data-table-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersThunk } from "@/redux/slices/orderListSlice";
import { RootState, AppDispatch } from "@/redux/store/store";

type Order = {
  id: number;
  customer_name?: string;
  total_amount?: number;
  status?: string;
  created_at?: string;
};

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.orderList);

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  const columns: ColumnDef<Order>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "customer_name", label: "Customer", sortable: true },
    { key: "total_amount", label: "Amount", sortable: true, render: (row) => `$${(Number(row.total_amount) || 0).toFixed(2)}` },
    { key: "status", label: "Status", sortable: true },
    { key: "created_at", label: "Created At", sortable: true, render: (row) => row.created_at ? new Date(row.created_at).toLocaleString() : "-" },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Orders" />

      <ComponentCard title="Orders List">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{String(error)}</div>
        ) : (
          <DataTable
            columns={columns}
            data={list}
            searchableColumns={["customer_name"]}
          />
        )}
      </ComponentCard>
    </div>
  );
}
