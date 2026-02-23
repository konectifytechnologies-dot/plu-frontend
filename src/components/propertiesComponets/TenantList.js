import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";
import axios from "@/lib/axios";
import TenantCard from "./TenantCard";
import AddTenant from "./AddTenant";
import Addnew from "../ui/add-new";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";
export default function TenantList() {
    const { id } = useParams({ strict: false });
    const { data: tenants, isLoading } = useQuery({
        queryKey: ['PROPERTY_TENANTS', { id }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/tenants/${id}`);
            return data;
        }
    });
    console.log(tenants);
    const isEmpty = tenants?.length < 1;
    return (_jsxs(_Fragment, { children: [isLoading && (_jsx(_Fragment, { children: Array(3)
                    .fill(0)
                    .map((_, index) => (_jsxs("div", { className: "flex w-fit items-center gap-4", children: [_jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-37.5" })] })] }, index))) })), tenants && (_jsx(_Fragment, { children: isEmpty ?
                    _jsx(_Fragment, { children: _jsxs(Empty, { children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconFolderCode, {}) }), _jsx(EmptyTitle, { children: "No Tenants Yet" }), _jsx(EmptyDescription, { children: "You haven't added any tenants to this property. Get started by creating your first tenant." })] }), _jsx(EmptyContent, { className: "flex-row justify-center gap-2", children: _jsx(Addnew, { label: "Add Tenant", title: "Add new Tenant", description: "Add a new Tenant to this property", fullwidth: false, children: _jsx(AddTenant, { initialData: null }) }) })] }) })
                    :
                        _jsx("div", { className: "grid grid-cols-1 gap-2", children: tenants.map((tenant) => (_jsx(TenantCard, { tenant: tenant }, tenant.id))) }) }))] }));
}
