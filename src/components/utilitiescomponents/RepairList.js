import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import ListPagination from "../ui/list-pagination";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { apiRequest } from "@/lib/apirequest";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../ui/select";
import { Item, ItemContent, ItemMedia, ItemTitle, } from "../ui/item";
import { Spinner } from "../ui/spinner";
export default function RepairsList() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('');
    const { data: repairs, isLoading } = useQuery({
        queryKey: ['REPAIRS', { page, status }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/repairs?page=${page}&status=${status}`);
            return data;
        }
    });
    const hasPagination = repairs?.meta.last_page > 1;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "rounded-lg border my-4", children: [_jsx("div", { className: "p-4", children: _jsxs(Select, { onValueChange: (value) => setStatus(value), children: [_jsx(SelectTrigger, { className: "w-full max-w-48", children: _jsx(SelectValue, { placeholder: "Sort by status" }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Sorty By Status" }), _jsx(SelectItem, { value: "pending", children: "Pending" }), _jsx(SelectItem, { value: "in-progress", children: "In Progress" }), _jsx(SelectItem, { value: "completed", children: "Completed" })] }) })] }) }), _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Property" }), _jsx(TableHead, { children: "House" }), _jsx(TableHead, { children: "Description" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Labor Cost" }), _jsx(TableHead, { children: "Total Repair Cost" }), _jsx(TableHead, { children: "Created Date" }), _jsx(TableHead, { children: "Actions" })] }) }), isLoading && (_jsx(TableBody, { children: Array(6)
                                .fill(0)
                                .map((_, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) })] }, index))) })), repairs && _jsx(TableBody, { children: repairs.data.map((item) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: item.property }), _jsx(TableCell, { children: item.unit }), _jsx(TableCell, { children: item.description }), _jsx(TableCell, { children: getStatusBadge(item.status) }), _jsxs(TableCell, { children: ["Kes ", item.repair_cost] }), _jsxs(TableCell, { children: ["Kes ", item.total_cost] }), _jsx(TableCell, { children: item.created_at }), _jsx(TableCell, { children: _jsx(UpdateStatus, { id: item.id, page: page }) })] }, item.id))) })] }), repairs && hasPagination && _jsx(ListPagination, { value: page, totalPages: repairs.meta.last_page, onChange: setPage })] }) }));
}
function getStatusBadge(status) {
    switch (status) {
        case "pending":
            return (_jsx(Badge, { variant: "outline", className: "border-0 bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20", children: "Pending" }));
        case "in-progress":
            return (_jsx(Badge, { variant: "outline", className: "border-0 bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20", children: "In Progress" }));
        case "completed":
            return (_jsx(Badge, { variant: "outline", className: "border-0 bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20", children: "Completed" }));
        default:
            return _jsx(Badge, { variant: "secondary", children: status });
    }
}
const UpdateStatus = ({ id, page }) => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const handleAddUnit = async (status) => {
        setLoading(true);
        const url = `/api/repair/status/${id}`;
        const { data, error } = await apiRequest(() => axios.patch(url, { status }));
        console.log(data, error);
        if (error) {
            setLoading(false);
            console.log(error);
        }
        if (data) {
            setLoading(false);
            toast(data.message, { position: 'top-center' });
            queryClient.invalidateQueries(['REPAIRS', { page, status: '' }]);
        }
    };
    return (_jsxs(_Fragment, { children: [loading && (_jsx("div", { className: "flex w-full max-w-xs flex-col gap-4 [--radius:1rem]", children: _jsxs(Item, { variant: "muted", children: [_jsx(ItemMedia, { children: _jsx(Spinner, {}) }), _jsx(ItemContent, { children: _jsx(ItemTitle, { className: "line-clamp-1", children: "Updating..." }) })] }) })), !loading && _jsxs(Select, { onValueChange: (value) => handleAddUnit(value), children: [_jsx(SelectTrigger, { className: "w-full max-w-48 cursor-pointer", children: _jsx(SelectValue, { placeholder: "Update status" }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Status" }), _jsx(SelectItem, { value: "pending", children: "Pending" }), _jsx(SelectItem, { value: "in-progress", children: "In Progress" }), _jsx(SelectItem, { value: "completed", children: "Completed" })] }) })] })] }));
};
