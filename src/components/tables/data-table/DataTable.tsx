// components/data-table/DataTable.tsx
"use client";

import React, { useMemo, useState } from "react";
import { ColumnDef, PageInfo } from "@/lib/types/data-table-types";
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";
import DataTablePagination from "./DataTablePagination";
import { compareValues } from "./utils";
import { useDebounce } from "./useDebounce";

type DataTableProps<T = any> = {
    columns: ColumnDef<T>[];
    data: T[];
    defaultPageSize?: number;
    pageSizeOptions?: number[];
    defaultSort?: { key: string; asc?: boolean } | null;
    placeholderSearch?: string;
    className?: string;
};

export default function DataTable<T = any>({
    columns,
    data,
    defaultPageSize = 10,
    pageSizeOptions = [5, 10, 20, 50],
    defaultSort = null,
    placeholderSearch = "Search...",
    className = "",
}: DataTableProps<T>) {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 300);

    const [sortKey, setSortKey] = useState<string | null>(defaultSort?.key ?? null);
    const [sortAsc, setSortAsc] = useState<boolean>(defaultSort?.asc ?? true);

    // Derived filtered+sorted rows
    const processed = useMemo(() => {
        let rows = Array.isArray(data) ? [...data] : [];

        // Global search across visible columns' stringified values
        if (debouncedSearch && debouncedSearch.trim() !== "") {
            const q = debouncedSearch.trim().toLowerCase();
            rows = rows.filter((r) =>
                columns.some((col) => {
                    if (col.key === "actions") return false;
                    const v = (r as any)[col.key];
                    return String(v ?? "").toLowerCase().includes(q);
                })
            );
        }

        // Sorting
        if (sortKey) {
            rows.sort((a: any, b: any) =>
                compareValues(a[sortKey], b[sortKey], sortAsc)
            );
        }

        return rows;
    }, [data, debouncedSearch, sortKey, sortAsc, columns]);

    const total = processed.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    // Clamp page
    if (page > totalPages) setPage(totalPages);

    const visibleRows = useMemo(() => {
        const start = (page - 1) * pageSize;
        return processed.slice(start, start + pageSize);
    }, [processed, page, pageSize]);

    // handlers
    function handleSort(key: string) {
        if (sortKey === key) setSortAsc((s) => !s);
        else {
            setSortKey(key);
            setSortAsc(true);
        }
        setPage(1);
    }

    function handlePageChange(p: number) {
        setPage(p);
        // scroll into view optionally
        window?.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handlePageSizeChange(s: number) {
        setPageSize(s);
        setPage(1);
    }

    const pageInfo: PageInfo = { page, pageSize };

    return (
        // <div className={`rounded-sm border border-stroke bg-white p-4 shadow-sm ${className}`}>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] py-4 sm:py-6">

            <div className="md:flex md:items-center md:justify-between mb-4 gap-4 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <label className="text-gray-500 text-start text-theme-sm dark:text-gray-400">Show</label>
                    <select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="
                border rounded px-2 py-1 text-sm
                bg-white text-gray-700
                dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition-colors outline-none
            "
                    >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                    <span className="text-gray-500 text-start text-theme-sm dark:text-gray-400">entries</span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <input
                        className="
                w-full md:w-72 border rounded px-3 py-1 text-sm
                bg-white text-gray-700
                dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
                placeholder-gray-400 dark:placeholder-gray-500
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition-colors outline-none
            "
                        placeholder={placeholderSearch}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        aria-label="Search table"
                    />
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 dark:divide-white/[0.05]">
                    <DataTableHeader<T>
                        columns={columns}
                        onSort={handleSort}
                        sortKey={sortKey}
                        sortAsc={sortAsc}
                    />
                    <DataTableBody<T> columns={columns} rows={visibleRows} />
                </table>
            </div>

            <div className="mt-4 md:flex md:items-center md:justify-between px-4 sm:px-6">
                <div className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
                    {Math.min(page * pageSize, total)} of {total} entries
                </div>

                <DataTablePagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>

    );
}
