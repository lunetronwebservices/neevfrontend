// components/data-table/utils.ts
export function compareValues(a: any, b: any, asc = true) {
    if (a == null && b == null) return 0;
    if (a == null) return asc ? -1 : 1;
    if (b == null) return asc ? 1 : -1;

    // numbers first
    if (typeof a === "number" && typeof b === "number") {
        return asc ? a - b : b - a;
    }
    // try date parse
    const da = Date.parse(String(a));
    const db = Date.parse(String(b));
    if (!Number.isNaN(da) && !Number.isNaN(db)) {
        return asc ? da - db : db - da;
    }

    // fallback to string localeCompare
    return asc
        ? String(a).localeCompare(String(b))
        : String(b).localeCompare(String(a));
}

/**
 * Generate pages array with ellipses for large page counts
 * Example: (current=10, total=50) -> [1, '...', 8,9,10,11,12, '...', 50]
 */
export function paginatePages(current: number, total: number, radius = 2) {
    if (total <= 1) return [1];
    const pages: (number | "...")[] = [];
    const left = Math.max(2, current - radius);
    const right = Math.min(total - 1, current + radius);

    pages.push(1);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < total - 1) pages.push("...");

    if (total > 1) pages.push(total);

    return pages;
}
