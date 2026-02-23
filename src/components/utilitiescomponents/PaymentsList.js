import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { YearSelector } from "../ui/year-selector";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import ListPagination from "../ui/list-pagination";
import Addnew from "../ui/add-new";
import EditPayment from "./EditPayment";
import { Button } from "../ui/button";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/apirequest";
export default function PaymentList() {
    const [page, setPage] = useState(1);
    const [month, setMonth] = useState('');
    const [query, setQuery] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const MONTHS = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const { data: payments, isLoading } = useQuery({
        queryKey: ['PAYMENTS', { page, month, year, query }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/payments?page=${page}&query=${query}&year=${year}&month=${month}`);
            return data;
        }
    });
    const hasPagination = payments?.meta.last_page > 1;
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsx("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: _jsxs("div", { className: "flex items-center gap-2 py-4", children: [_jsx("div", { children: _jsx(YearSelector, { value: year, onChange: setYear }) }), _jsxs(Select, { value: month, onValueChange: setMonth, children: [_jsxs(SelectTrigger, { id: "sort", className: "", children: ["Sort by: ", _jsx(SelectValue, {})] }), _jsx(SelectContent, { children: MONTHS.map((month) => (_jsx(SelectItem, { value: month, children: month }))) })] }), _jsx(Input, { placeholder: "Tenant Phone number", value: query, onChange: (e) => setQuery(e.target.value), className: "h-8 w-full sm:w-64" })] }) }), _jsxs("div", { className: "rounded-lg border my-4", children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Paid By" }), _jsx(TableHead, { children: "Paid For" }), _jsx(TableHead, { children: "Payment Method" }), _jsx(TableHead, { children: "Payment Reference Code" }), _jsx(TableHead, { children: "Payment Type" }), _jsx(TableHead, { children: "Amount Due" }), _jsx(TableHead, { children: "Amount Paid" }), _jsx(TableHead, { children: "Property" }), _jsx(TableHead, { children: "Action" })] }) }), isLoading && (_jsx(TableBody, { children: Array(6)
                                        .fill(0)
                                        .map((_, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) })] }, index))) })), payments && _jsx(TableBody, { children: payments.data.map((item) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: item.user }), _jsx(TableCell, { children: item.description }), _jsx(TableCell, { children: item.payment_method }), _jsx(TableCell, { children: item.reference_code }), _jsx(TableCell, { className: "uppercase", children: item.payment_type }), _jsxs(TableCell, { children: ["Kes ", item.amount_due] }), _jsxs(TableCell, { children: ["Kes ", item.amount_paid] }), _jsx(TableCell, { children: item.property }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Addnew, { label: "Edit Payment", title: "Edit Payment", description: "Edit this payment", fullwidth: false, children: _jsx(EditPayment, { payment: item }) }), _jsx(DeletePayment, { id: payments.id, month: month, page: page, year: year, query: query })] }) })] }, item.id))) })] }), payments && hasPagination && _jsx(ListPagination, { value: page, totalPages: payments.meta.last_page, onChange: setPage })] })] }) }));
}
const DeletePayment = ({ id, month, page, year, query }) => {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const handleDelete = async () => {
        setLoading(true);
        const url = `/api/payment/${id}`;
        const { data, error } = await apiRequest(() => axios.delete(url));
        if (error) {
            setLoading(false);
            console.log(error);
        }
        if (data) {
            console.log(data);
            setLoading(false);
            toast(data.message, { position: 'top-center' });
            queryClient.invalidateQueries(['PAYMENTS', { page, month, year, query }]);
        }
    };
    return (_jsxs(Button, { type: "button", variant: "destructive", onClick: handleDelete, children: [_jsx(IconTrash, {}), "Delete"] }));
};
