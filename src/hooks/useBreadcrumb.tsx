import { formatPathname, type Breadcrumb } from "@/lib/utils";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function useFileRoute(): Breadcrumb {
    const location = useLocation();
    const [route, setRoute] = useState<Breadcrumb>({
        segments: [],
        current: 'Dashboard',
        fullPath: 'Dashboard'
    });

    useEffect(() => {
        setRoute(formatPathname(location.pathname));
    }, [location]);

    return route;
}