
export type User = {
    id: string;
    name: string;
    position: string;
    office: string;
    age: number;
    startDate: string;
    salary: string;
};

export type ColumnDef = {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (row: any) => React.ReactNode;
};

export type SortOrder = "asc" | "desc";
