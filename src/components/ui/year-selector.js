import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function YearSelector({ value, onChange, minYear = 2000 }) {
    const currentYear = new Date().getFullYear();
    const selectedYear = value ?? currentYear;
    const canGoNext = selectedYear < currentYear;
    const canGoPrev = selectedYear > minYear;
    return (_jsxs("div", { className: "inline-flex items-center gap-2 rounded-md border p-1", children: [_jsx(Button, { type: "button", variant: "ghost", size: "sm", disabled: !canGoPrev, onClick: () => onChange(selectedYear - 1), children: "\u2190" }), _jsx("div", { className: cn("px-3 py-1 text-sm font-medium", selectedYear === currentYear && "text-muted-foreground"), children: selectedYear }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", disabled: !canGoNext, onClick: () => onChange(selectedYear + 1), children: "\u2192" })] }));
}
