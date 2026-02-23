import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import axios from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import UnitCard from "./UnitCard";
import Addnew from "../ui/add-new";
import AddUnit from "./AddUnit";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";
export default function UnitsList() {
    const { id } = useParams({ strict: false });
    const [ids, setIds] = useState([]);
    const { data: units, isLoading } = useQuery({
        queryKey: ['PROPERTY_UNITS', { id }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/units/${id}`);
            return data;
        }
    });
    const isEmpty = units?.length < 1;
    return (_jsxs(_Fragment, { children: [isLoading && (_jsx(_Fragment, { children: Array(3)
                    .fill(0)
                    .map((_, index) => (_jsxs("div", { className: "flex w-fit items-center gap-4", children: [_jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-37.5" })] })] }, index))) })), units && (_jsx(_Fragment, { children: isEmpty ?
                    _jsx(_Fragment, { children: _jsxs(Empty, { children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconFolderCode, {}) }), _jsx(EmptyTitle, { children: "No Units Yet" }), _jsx(EmptyDescription, { children: "You haven't added any units to this property. Get started by creating your first unit." })] }), _jsx(EmptyContent, { className: "flex-row justify-center gap-2", children: _jsx(Addnew, { label: "Add Unit", title: "Add new Unit", description: "Add a new unit to this property", fullwidth: false, children: _jsx(AddUnit, { initialData: null }) }) })] }) })
                    :
                        _jsx("div", { className: "grid grid-cols-1 gap-2", children: units.map((unit) => {
                                return (_jsx(UnitCard, { unit: unit }, unit.id));
                            }) }) }))] }));
}
