import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@mantine/hooks";
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
export function MonthPicker({ value, onChange }) {
    const [open, handlers] = useDisclosure(false);
    const selectedMonth = value ? Number(value.split("-")[1]) - 1 : null;
    function selectMonth(month) {
        //const month = String(monthIndex + 1).padStart(2, "0")
        onChange(month);
        handlers.toggle();
    }
    return (_jsxs(Popover, { open: open, onOpenChange: () => handlers.toggle(), children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-full justify-start font-normal", children: value ? value : "Select month" }) }), _jsx(PopoverContent, { className: "w-64 p-3", children: _jsx("div", { className: "grid grid-cols-3 gap-2", children: MONTHS.map((month) => {
                        const isSelected = month === value;
                        return (_jsx(Button, { variant: isSelected ? "default" : "outline", size: "sm", onClick: () => selectMonth(month), className: cn("text-xs", isSelected && "pointer-events-none"), children: month }, month));
                    }) }) })] }));
}
