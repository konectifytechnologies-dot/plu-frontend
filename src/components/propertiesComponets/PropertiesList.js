import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconPlus } from "@tabler/icons-react";
import { IconFolderCode } from "@tabler/icons-react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../ui/empty";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import PropertyCard from "./PropertyCard";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Search } from "lucide-react";
import { useState } from "react";
import ListPagination from "../ui/list-pagination";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
export default function PropertiesList() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const { data: properties, isLoading } = useQuery({
        queryKey: ["USER_PROPERTIES", { page, query }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/properties?page=${page}&query=${query}`);
            return data;
        }
    });
    const isEmpty = properties?.data.length < 1;
    const hasPagination = properties?.meta.last_page > 1;
    return (_jsx(_Fragment, { children: _jsxs(Card, { className: "@container/card", children: [_jsx(CardHeader, { children: _jsxs(InputGroup, { className: "max-w-xs", children: [_jsx(InputGroupInput, { placeholder: "Search Properties", value: query, onChange: (e) => setQuery(e.target.value) }), _jsx(InputGroupAddon, { children: _jsx(Search, {}) }), _jsxs(InputGroupAddon, { align: "inline-end", children: [properties?.meta.total, " Results"] })] }) }), _jsxs(CardContent, { className: "px-2 sm:px-6", children: [isLoading && (_jsx(_Fragment, { children: Array(3)
                                .fill(0)
                                .map((_, index) => (_jsxs("div", { className: "flex w-fit items-center gap-4", children: [_jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Skeleton, { className: "h-4 w-37.5" }), _jsx(Skeleton, { className: "h-4 w-37.5" })] })] }, index))) })), properties && (_jsxs(_Fragment, { children: [isEmpty && (_jsxs(Empty, { children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconFolderCode, {}) }), _jsx(EmptyTitle, { children: "No Properties Yet" }), _jsx(EmptyDescription, { children: "You haven't added any properties yet. Get started by creating your first property." })] }), _jsx(EmptyContent, { className: "flex-row justify-center gap-2", children: _jsx(Button, { asChild: true, children: _jsxs(Link, { to: "/account/$role/add_property", children: [_jsx(IconPlus, {}), " Add Property"] }) }) })] })), !isEmpty &&
                                    _jsx("div", { className: "grid grid-cols-1 gap-2", children: properties.data.map((prop) => (_jsx(PropertyCard, { property: prop }, prop.id))) })] })), properties && hasPagination && _jsx(ListPagination, { value: page, totalPages: properties.meta.last_page, onChange: setPage })] })] }) }));
}
