export type ColumnDef<T = any> = {
    key: string;                      // property key in row object
    label: string;                    // header label
    sortable?: boolean;               // enable sorting on this column
    width?: string;                   // optional width (e.g. "w-32")
    align?: "left" | "center" | "right";
    render?: (row: T) => React.ReactNode; // custom render for cell
};

export type PageInfo = {
    page: number;
    pageSize: number;
};