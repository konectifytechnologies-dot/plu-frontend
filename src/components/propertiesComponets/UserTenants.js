import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { useState } from "react";
import { Search } from "lucide-react";
import ListPagination from "../ui/list-pagination";
import TenantCard from "./TenantCard";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../ui/empty";
import Addnew from "../ui/add-new";
import AddTenant from "./AddTenant";
import { IconFolderCode } from "@tabler/icons-react";
export default function UserTenants() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const { data: tenants, isLoading } = useQuery({
        queryKey: ['USER_TENANTS', { page, query }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/tenants?query=${query}&page=${page}`);
            return data;
        }
    });
    const hasPagination = tenants?.meta.last_page > 1;
    const isEmpty = tenants?.data.length < 1;
    return (_jsx(_Fragment, { children: _jsxs(Card, { className: "@container/card", children: [_jsx(CardHeader, { children: _jsxs(InputGroup, { className: "max-w-xs", children: [_jsx(InputGroupInput, { placeholder: "Search Properties", value: query, onChange: (e) => setQuery(e.target.value) }), _jsx(InputGroupAddon, { children: _jsx(Search, {}) }), _jsxs(InputGroupAddon, { align: "inline-end", children: [tenants?.meta.total, " Results"] })] }) }), _jsxs(CardContent, { children: [isLoading && (_jsx(_Fragment, { children: Array(3)
                                .fill(0)
                                .map((_, index) => (_jsxs("div", { className: "flex w-fit items-center gap-4", children: [_jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-37.5" })] })] }, index))) })), tenants && (_jsx(_Fragment, { children: isEmpty ?
                                _jsx(_Fragment, { children: _jsxs(Empty, { children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconFolderCode, {}) }), _jsx(EmptyTitle, { children: "No Tenants Yet" }), _jsx(EmptyDescription, { children: "You haven't added any tenants to this property. Get started by creating your first tenant." })] }), _jsx(EmptyContent, { className: "flex-row justify-center gap-2", children: _jsx(Addnew, { label: "Add Tenant", title: "Add new Tenant", description: "Add a new Tenant to this property", fullwidth: false, children: _jsx(AddTenant, { initialData: null }) }) })] }) })
                                :
                                    _jsx("div", { className: "grid grid-cols-1 gap-2", children: tenants.data.map((tenant) => (_jsx(TenantCard, { tenant: tenant }, tenant.id))) }) })), tenants && hasPagination && _jsx(ListPagination, { value: page, totalPages: tenants.meta.last_page, onChange: setPage })] })] }) }));
}
