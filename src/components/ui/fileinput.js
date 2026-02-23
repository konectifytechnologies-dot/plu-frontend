import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
function Component() {
    const id = useId();
    return (_jsxs("div", { className: "space-y-2 min-w-75", children: [_jsx(Label, { htmlFor: id, children: "File input" }), _jsx(Input, { id: id, className: "p-0 pe-3 file:me-3 file:border-0 file:border-e", type: "file" })] }));
}
export { Component };
