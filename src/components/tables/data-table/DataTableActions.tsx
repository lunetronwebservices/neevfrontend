"use client";

export default function DataTableActions({ row, actions }: any) {
    return (
        <div className="flex gap-2">
            {actions.map((action: any) => (
                <button
                    key={action.name}
                    onClick={() => action.onClick(row)}
                    className="text-blue-600 hover:underline"
                >
                    {action.name}
                </button>
            ))}
        </div>
    );
}
