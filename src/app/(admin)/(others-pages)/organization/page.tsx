"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DataTable from "@/components/tables/data-table/DataTable";
import { ColumnDef } from "@/lib/types/data-table-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizations } from "@/redux/slices/organizationSlice";
import { Organization } from "@/lib/types/organization";
import { RootState, AppDispatch } from "@/redux/store/store";

export default function OrganizationPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { list, loading, error } = useSelector((state: RootState) => state.organization);

    useEffect(() => {
        dispatch(fetchOrganizations());
    }, [dispatch]);

    const columns: ColumnDef<Organization>[] = [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "code", label: "Code", sortable: true },
        { key: "industry", label: "Industry", sortable: true },
        { key: "address", label: "Address", sortable: true },
        {
            key: "is_active", label: "Active", sortable: true, render: row => (
                <span className={row.is_active ? "text-green-600" : "text-red-600"}>
                    {row.is_active ? "Yes" : "No"}
                </span>
            )
        },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
            render: (row) => new Date(row.created_at).toLocaleDateString(),
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex gap-3 text-sm">
                    <button
                        onClick={() => alert(`Edit ${row.id}`)}
                        className="text-indigo-600 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => alert(`Delete ${row.id}`)}
                        className="text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageBreadcrumb pageTitle="Organization" />

            <ComponentCard title="Organization List">
                {loading ? (
                    <div className="p-6 text-center">Loading...</div>
                ) : error ? (
                    <div className="p-6 text-center text-red-600">{error}</div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={list}
                        defaultPageSize={5}
                        pageSizeOptions={[2, 5, 10, 20]}
                    />
                )}
            </ComponentCard>
        </div>
    );
}


// "use client";

// import ComponentCard from "@/components/common/ComponentCard";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import DataTable from "@/components/tables/data-table/DataTable";
// import { ColumnDef } from "@/lib/type/data-table-types";
// import React, { useEffect, useState } from "react";

// // Example type and sample fetch (you will replace with your API)
// type User = {
//     id: string;
//     name: string;
//     position: string;
//     office: string;
//     age: number;
//     startDate: string;
//     salary: number;
// };

// export default function Organization() {
//     const [data, setData] = useState<User[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Replace with your own fetch call; here we create sample data
//         const sample: User[] = [
//             { id: "1", name: "Abram Schleifer", position: "Sales Assistant", office: "Edinburgh", age: 57, startDate: "25 Apr, 2027", salary: 89500 },
//             { id: "2", name: "Charlotte Anderson", position: "Marketing Manager", office: "London", age: 42, startDate: "12 Mar, 2025", salary: 105000 },
//             // ...more rows
//         ];
//         // Simulate fetch
//         setTimeout(() => { setData(sample); setLoading(false); }, 250);
//     }, []);

//     const columns: ColumnDef<User>[] = [
//         { key: "name", label: "User", sortable: true },
//         { key: "position", label: "Position", sortable: true },
//         { key: "office", label: "Office", sortable: true },
//         { key: "age", label: "Age", sortable: true, align: "right" },
//         { key: "startDate", label: "Start date", sortable: true },
//         {
//             key: "salary",
//             label: "Salary",
//             sortable: true,
//             align: "right",
//             render: (row) => <span>${Number(row.salary).toLocaleString()}</span>,
//         },
//         {
//             key: "actions",
//             label: "Actions",
//             render: (row: any) => (
//                 <div className="flex gap-3 text-sm">
//                     <button onClick={() => alert(`Edit ${row.id}`)} className="text-indigo-600 hover:underline">Edit</button>
//                     <button onClick={() => alert(`Delete ${row.id}`)} className="text-red-600 hover:underline">Delete</button>
//                 </div>
//             ),
//         },
//     ];

//     return (

//         <div>
//             <PageBreadcrumb pageTitle="Organization" />
//             <div className="space-y-6">
//                 <ComponentCard title="Organization List">
//                     {loading ? (
//                         <div className="p-6 rounded shadow text-center">Loading...</div>
//                     ) : (
//                         <DataTable columns={columns} data={data} defaultPageSize={5} pageSizeOptions={[5, 10, 20]} />
//                     )}
//                 </ComponentCard>
//             </div>
//         </div>

//     );
// }


// "use client";

// import ComponentCard from "@/components/common/ComponentCard";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import DataTable from "@/components/tables/data-table/DataTable";
// import { ColumnDef } from "@/lib/types/data-table-types";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store/store";
// import { fetchOrganizations } from "@/redux/slices/organizationSlice";
// import React, { useEffect } from "react";

// export default function OrganizationPage() {
//     const dispatch = useDispatch<AppDispatch>();
//     const { list, loading, error } = useSelector(
//         (state: RootState) => state.organizations
//     );

//     useEffect(() => {
//         dispatch(fetchOrganizations());
//     }, [dispatch]);

//     const columns: ColumnDef<any>[] = [
//         { key: "id", label: "ID", sortable: true },
//         { key: "name", label: "Organization", sortable: true },
//         { key: "code", label: "Code", sortable: true },
//         { key: "industry", label: "Industry", sortable: true },
//         {
//             key: "actions",
//             label: "Actions",
//             render: (row) => (
//                 <div className="flex gap-3 text-sm">
//                     <button
//                         onClick={() => alert(`Edit ${row.id}`)}
//                         className="text-indigo-600 hover:underline"
//                     >
//                         Edit
//                     </button>
//                     <button
//                         onClick={() => alert(`Delete ${row.id}`)}
//                         className="text-red-600 hover:underline"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <PageBreadcrumb pageTitle="Organization" />

//             <ComponentCard title="Organization List">
//                 {loading ? (
//                     <div className="p-6 text-center">Loading...</div>
//                 ) : error ? (
//                     <div className="p-6 text-center text-red-600">{error}</div>
//                 ) : (
//                     <DataTable
//                         columns={columns}
//                         data={list}
//                         defaultPageSize={5}
//                         pageSizeOptions={[5, 10, 20]}
//                     />
//                 )}
//             </ComponentCard>
//         </div>
//     );
// }
