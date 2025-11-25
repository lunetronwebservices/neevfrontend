// components/data-table/DataTableHeader.tsx
"use client";

import { ColumnDef } from "@/lib/types/data-table-types";
import React from "react";

type Props<T = any> = {
    columns: ColumnDef<T>[];
    onSort: (key: string) => void;
    sortKey: string | null;
    sortAsc: boolean;
};

export default function DataTableHeader<T>({
    columns,
    onSort,
    sortKey,
    sortAsc,
}: Props<T>) {
    return (
        <thead className="">
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.key}
                        className={`px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 ${col.width ?? ""
                            } ${col.sortable ? "cursor-pointer select-none" : ""}`}
                        onClick={() => col.sortable && onSort(col.key)}
                        aria-sort={
                            sortKey === col.key ? (sortAsc ? "ascending" : "descending") : "none"
                        }
                    >
                        <div className="flex items-center gap-2">
                            <span>{col.label}</span>
                            {col.sortable && sortKey === col.key && (
                                <svg
                                    className="w-4 h-4 text-gray-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    {sortAsc ? (
                                        <path d="M5 11h10L10 4 5 11z" />
                                    ) : (
                                        <path d="M5 9h10L10 16 5 9z" />
                                    )}
                                </svg>
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}
