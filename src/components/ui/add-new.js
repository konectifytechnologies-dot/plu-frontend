import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
export default function Addnew(props) {
    const { label, title, description, fullwidth = true, children } = props;
    return (_jsx(_Fragment, { children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: cn('w-fit cursor-pointer', fullwidth && 'w-full'), children: [_jsx(IconPlus, {}), label] }) }), _jsxs(DialogContent, { className: "max-h-[90vh] bg-gray-50 flex flex-col", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { children: description })] }), _jsx("div", { className: "flex-1 overflow-y-auto py-2", children: children }), _jsx(DialogFooter, { children: _jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }) })] })] }) }));
}
