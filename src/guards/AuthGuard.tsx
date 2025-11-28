"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";

export default function AuthGuard({
    children,
    allowedRoles,
}: {
    children: React.ReactNode;
    allowedRoles?: string[];
}) {
    const router = useRouter();
    const { isAuthenticated, role } = useAppSelector((s: any) => s.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/signin");
        }

        if (allowedRoles && !allowedRoles.includes(role ?? "")) {
            router.replace("/not-authorized");
        }
    }, [isAuthenticated, role]);

    return <>{children} </>;
}
