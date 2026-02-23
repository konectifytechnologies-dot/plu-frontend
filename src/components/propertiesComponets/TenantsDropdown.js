import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Command, CommandInput, CommandList, CommandItem, } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import { IconChevronCompactDown, IconChevronCompactUp } from "@tabler/icons-react";
import { Button } from "../ui/button";
export default function TenantsDropdown({ items = [], value, placeholder = "Select Tenant", handleChange }) {
    const [opened, handlers] = useDisclosure(false);
    const [search, setSearch] = useState('');
    const triggerRef = useRef(null);
    const [triggerWidth, setTriggerWidth] = useState(0);
    useEffect(() => {
        if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth);
        }
    }, []);
    const filteredItems = items?.filter((item) => item?.name?.toLowerCase().includes(search.toLowerCase()));
    const handleValueChange = (item) => {
        handleChange && handleChange(item);
        handlers.toggle();
    };
    return (_jsx(_Fragment, { children: _jsxs(Popover, { open: opened, onOpenChange: () => handlers.toggle(), children: [_jsx(PopoverTrigger, { ref: triggerRef, asChild: true, children: _jsxs(Button, { type: "button", variant: "outline", className: "w-full flex items-center justify-between", children: [_jsx("span", { children: value ?? placeholder }), opened ? _jsx(IconChevronCompactUp, {}) : _jsx(IconChevronCompactDown, {})] }) }), _jsx(PopoverContent, { style: { width: triggerWidth }, className: "p-0", children: _jsxs(Command, { children: [_jsx(CommandInput, { value: search, onValueChange: setSearch, placeholder: "Search...", className: "sticky top-0 bg-white z-10 border-b border-gray-200" }), _jsx(CommandList, { children: items ?
                                    _jsx(_Fragment, { children: filteredItems?.length > 0 ? (filteredItems?.map((item) => (_jsxs(CommandItem, { onSelect: () => handleValueChange(item), className: "flex flex-col items-start", children: [_jsx("span", { className: "text-primary font-sans", children: item.name }), _jsx("span", { className: "text-muted-foreground font-sans block", children: item.number })] }, item.id)))) : (_jsx("div", { className: "p-2 text-gray-500", children: "No results found" })) })
                                    :
                                        _jsx(_Fragment, { children: Array(15)
                                                .fill(0)
                                                .map((_, index) => (_jsx(CommandItem, { children: _jsx(Skeleton, { className: "h-4 rounded-none w-full" }) }, index))) }) })] }) })] }) }));
}
