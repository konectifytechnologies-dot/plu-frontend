import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
import { useState } from "react";
import { abbreviateNameInitials } from "@/lib/utilFunctions";
import { Skeleton } from "../ui/skeleton";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../ui/input-group";
import { Search } from "lucide-react";
import ListPagination from "../ui/list-pagination";
export default function LandlordList() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const is_active = false;
    const { data: users, isLoading } = useQuery({
        queryKey: ['AGENT_LANDLORDS', { query, page, is_active }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/landlords?page=${page}&query=${query}&is_active=${is_active}`);
            return data;
        }
    });
    const hasPagination = users?.meta.last_page > 1;
    return (_jsx(_Fragment, { children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(InputGroup, { className: "max-w-xs", children: [_jsx(InputGroupInput, { placeholder: "Search Landlords", value: query, onChange: (e) => setQuery(e.target.value) }), _jsx(InputGroupAddon, { children: _jsx(Search, {}) }), _jsxs(InputGroupAddon, { align: "inline-end", children: [users?.meta.total, " Results"] })] }) }), _jsxs(CardContent, { children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Number" }), _jsx(TableHead, { children: "Properties" })] }) }), isLoading && (_jsx(TableBody, { children: Array(6)
                                        .fill(0)
                                        .map((_, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) })] }, index))) })), users && (_jsx(TableBody, { children: users.data.map((user) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h6", { className: "rounded-full bg-purple-100 w-14 h-14 grid place-items-center", children: _jsx("span", { children: abbreviateNameInitials(user.name) }) }), _jsx("p", { children: user.name })] }) }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: user.number }), _jsxs(TableCell, { children: [user.properties, " Properties Owned"] })] }, user.id))) }))] }), users && hasPagination && _jsx(ListPagination, { value: page, totalPages: users.last_page, onChange: setPage })] })] }) }));
}
