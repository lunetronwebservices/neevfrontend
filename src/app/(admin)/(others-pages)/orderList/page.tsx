"use client"
import React, { useMemo, useState } from "react";

type OrderStatus = "Delivered" | "Pending" | "Canceled";

type Order = {
  id: number;
  productName: string;
  variants: string;
  category: string;
  price: number;
  status: OrderStatus;
};

const allOrders: Order[] = [
  { id: 1,  productName: "MacBook Pro 13”",  variants: "2 Variants", category: "Laptop",      price: 2399, status: "Delivered" },
  { id: 2,  productName: "Apple Watch Ultra", variants: "1 Variant", category: "Watch",       price: 879,  status: "Pending"   },
  { id: 3,  productName: "iPhone 15 Pro Max", variants: "2 Variants", category: "SmartPhone", price: 1869, status: "Delivered" },
  { id: 4,  productName: "iPad Pro 3rd Gen",  variants: "2 Variants", category: "Electronics",price: 1699, status: "Canceled"  },
  { id: 5,  productName: "AirPods Pro 2nd Gen",variants: "1 Variant", category: "Accessories",price: 240,  status: "Delivered" },
  { id: 6,  productName: "Galaxy S24 Ultra",  variants: "3 Variants", category: "SmartPhone", price: 1499, status: "Pending"   },
  { id: 7,  productName: "Dell XPS 15",       variants: "2 Variants", category: "Laptop",      price: 2199, status: "Delivered" },
  { id: 8,  productName: "Sony WH‑1000XM5",   variants: "1 Variant", category: "Headphones",   price: 399,  status: "Delivered" },
  { id: 9,  productName: "Kindle Oasis",      variants: "1 Variant", category: "Accessories",  price: 299,  status: "Canceled"  },
  { id: 10, productName: "Apple Watch SE",    variants: "1 Variant", category: "Watch",        price: 329,  status: "Delivered" },
  { id: 11, productName: "Logitech MX Master 3", variants: "1 Variant", category: "Accessories", price: 129, status: "Delivered" },
  { id: 12, productName: "Surface Pro 9",     variants: "2 Variants", category: "Laptop",      price: 1899, status: "Pending"   },
];

type SortKey = "productName" | "category" | "price" | "status";
type SortDir = "asc" | "desc";

const OrdersList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");

  const [sortKey, setSortKey] = useState<SortKey>("productName");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filteredSorted = useMemo(() => {
    let data = [...allOrders];

    // Filter by status
    if (statusFilter !== "All") {
      data = data.filter((o) => o.status === statusFilter);
    }

    // Filter by search
    const q = search.toLowerCase().trim();
    if (q) {
      data = data.filter(
        (o) =>
          o.productName.toLowerCase().includes(q) ||
          o.category.toLowerCase().includes(q)
      );
    }

    // Sort
    data.sort((a, b) => {
      let v1: string | number = a[sortKey];
      let v2: string | number = b[sortKey];

      if (typeof v1 === "string") v1 = v1.toLowerCase();
      if (typeof v2 === "string") v2 = v2.toLowerCase();

      if (v1 < v2) return sortDir === "asc" ? -1 : 1;
      if (v1 > v2) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [search, statusFilter, sortKey, sortDir]);

  // Pagination
  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  const pageData = filteredSorted.slice(startIndex, endIndex);

  const changePageSize = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold">
          Recent Orders <span className="text-sm text-gray-500">({total})</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search product or category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm w-60 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "All" | OrderStatus);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>

          {/* Page size */}
          <select
            value={pageSize}
            onChange={(e) => changePageSize(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-gray-500">
            <th
              className="py-2 text-left cursor-pointer select-none"
              onClick={() => handleSort("productName")}
            >
              Products{" "}
              {sortKey === "productName" && (sortDir === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="py-2 text-left cursor-pointer select-none"
              onClick={() => handleSort("category")}
            >
              Category {sortKey === "category" && (sortDir === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="py-2 text-left cursor-pointer select-none"
              onClick={() => handleSort("price")}
            >
              Price {sortKey === "price" && (sortDir === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="py-2 text-left cursor-pointer select-none"
              onClick={() => handleSort("status")}
            >
              Status {sortKey === "status" && (sortDir === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-400">
                No orders found
              </td>
            </tr>
          ) : (
            pageData.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{order.productName}</span>
                    <span className="text-xs text-gray-500">
                      {order.variants}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-gray-600">{order.category}</td>
                <td className="py-3 text-gray-900">
                  ${order.price.toFixed(2)}
                </td>
                <td className="py-3">
                  <span
                    className={
                      "px-3 py-1 rounded-full text-xs font-medium " +
                      (order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700")
                    }
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Footer with info + pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-sm text-gray-600">
        <div>
          {total === 0 ? (
            "Showing 0 of 0 orders"
          ) : (
            <>
              Showing <span className="font-medium">{startIndex + 1}</span>–
              <span className="font-medium">{endIndex}</span> of{" "}
              <span className="font-medium">{total}</span> orders
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </span>
          <button
            onClick={() =>
              setPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
