"use client";

import React from "react";
import { paginatePages } from "./utils";
import Button from "@/components/ui/button/Button";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (p: number) => void;
};

export default function DataTablePagination({ page, totalPages, onPageChange }: Props) {
    const pages = paginatePages(page, totalPages, 2);

    function goto(p: number | "...") {
        if (p === "...") return;
        onPageChange(Number(p));
    }

    return (
        <nav className="flex items-center gap-2 mt-4" aria-label="Pagination">
            {/* Prev Button */}
            <Button
                size="sm"
                variant="ghost"
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="border dark:border-gray-700"
            >
                Prev
            </Button>

            {/* Page Numbers */}
            <ul className="inline-flex space-x-2">
                {pages.map((p, i) =>
                    p === "..." ? (
                        <li
                            key={`dots-${i}`}
                            className="
                        px-3 py-2 rounded-md border
                        bg-white text-gray-600
                        dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700
                    "
                        >
                            ...
                        </li>
                    ) : (
                        <li key={p}>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => goto(p)}
                                aria-current={p === page ? "page" : undefined}
                                className={`
                            px-3 py-2 border rounded-md transition-colors
                            ${p === page
                                        ? "bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500"
                                        : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }
                        `}
                            >
                                {p}
                            </Button>
                        </li>
                    )
                )}
            </ul>

            {/* Next Button */}
            <Button
                size="sm"
                variant="ghost"
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="border dark:border-gray-700"
            >
                Next
            </Button>
        </nav>

    );
}
