import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableRow, TableHead, TableHeader, } from "../ui/table";
import { useParams } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";
import Addnew from "../ui/add-new";
import AddCost from "./AddCost";
export default function PropertyCosts() {
    const { id } = useParams({ strict: false });
    const { data: costs, isLoading } = useQuery({
        queryKey: ['PROPERTY_COSTS', { id }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/costs/${id}`);
            return data;
        }
    });
    console.log(costs);
    return (_jsx(_Fragment, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Cost" }), _jsx(TableHead, { children: "Edit" })] }) }), isLoading && (_jsx(TableBody, { children: Array(4)
                        .fill(0)
                        .map((_, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-37.5" }) })] }, index))) })), costs && (_jsx(TableBody, { children: costs.map((cost) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: cost.title }), _jsxs(TableCell, { children: ["Kes ", cost.cost, " ", _jsx("small", { children: "Per Month" })] }), _jsx(TableCell, { children: _jsx(Addnew, { label: "Edit Cost", title: "Edit Cost", description: "Edit this additional cost", fullwidth: false, children: _jsx(AddCost, { initialData: cost }) }) })] }, cost.id))) }))] }) }));
}
