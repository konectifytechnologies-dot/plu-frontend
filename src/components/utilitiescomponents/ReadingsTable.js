import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { YearSelector } from "../ui/year-selector";
import ListPagination from "../ui/list-pagination";
export default function ReadingsList() {
    const { id } = useParams({ strict: false });
    const [page, setPage] = useState(1);
    const [month, setMonth] = useState(new Date().toLocaleString("en-US", { month: "long" }));
    const [query, setQuery] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const MONTHS = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const { data: readings, isLoading } = useQuery({
        queryKey: ['PROPERTY_METER_READINGS', { id, year, page, query, month }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/readings/${id}?year=${year}&month=${month}&page=${page}&query=${query}`);
            return data;
        }
    });
    const hasPagination = readings?.meta.last_page > 1;
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsx("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: _jsxs("div", { className: "flex items-center gap-2 py-4", children: [_jsx("div", { children: _jsx(YearSelector, { value: year, onChange: setYear }) }), _jsxs(Select, { value: month, onValueChange: setMonth, children: [_jsxs(SelectTrigger, { id: "sort", className: "", children: ["Sort by: ", _jsx(SelectValue, {})] }), _jsx(SelectContent, { children: MONTHS.map((month) => (_jsx(SelectItem, { value: month, children: month }))) })] }), _jsx(Input, { placeholder: "Tenant Phone number", value: query, onChange: (e) => setQuery(e.target.value), className: "h-8 w-full sm:w-64" })] }) }), _jsxs("div", { className: "rounded-lg border my-4", children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "House" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Last Month Reading" }), _jsxs(TableHead, { children: ["Current Reading For ", `${month}-${year}`] }), _jsx(TableHead, { children: "Units Consumed" }), _jsx(TableHead, { children: "Cost" })] }) }), isLoading && (_jsx(TableBody, { children: Array(6)
                                        .fill(0)
                                        .map((_, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) })] }, index))) })), readings && _jsx(TableBody, { children: readings.data.map((item) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h6", { className: "w-14 h-14 bg-purple-100 rounded-full border grid place-items-center", children: item.house }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Current Tenant" }), _jsx("p", { className: "text-sm", children: item.tenant })] })] }) }), _jsx(TableCell, { children: item.date }), _jsx(TableCell, { children: item.previous_reading }), _jsx(TableCell, { children: item.current_reading }), _jsx(TableCell, { children: item.units_consumed }), _jsxs(TableCell, { children: ["Kes ", item.amount] })] }, item.id))) })] }), readings && hasPagination && _jsx(ListPagination, { value: page, totalPages: readings.meta.last_page, onChange: setPage })] })] }) }));
}
