// components/data-table/DataTableBody.tsx
"use client";

import React from "react";
import { ColumnDef } from "@/lib/types/data-table-types";

type Props<T = any> = {
    columns: ColumnDef<T>[];
    rows: T[];
};

export default function DataTableBody<T>({ columns, rows }: Props<T>) {
    if (!rows || rows.length === 0) {
        return (
            <tbody>
                <tr>
                    <td className="px-6 py-6 text-center text-gray-500 text-theme-sm dark:text-gray-400" colSpan={columns.length}>
                        No results found
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {rows.map((row: any, idx: number) => (
                <tr
                    key={idx}
                    className="
                    hover:bg-gray-50 
                    dark:hover:bg-gray-700/50 
                    transition-colors"
                >
                    {columns.map((col) => (
                        <td
                            key={col.key}
                            className={`px-6 py-4 whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400 ${col.align === "right" ? "text-right" : (col.align === "center" ? "text-center" : "text-left")}`}
                        >
                            {col.render ? col.render(row) : String(row[col.key] ?? "")}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
