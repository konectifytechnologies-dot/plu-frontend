import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MoveRight } from "lucide-react";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";
export default function Submitbtn({ text, fullwidth = false, type = "submit", loading, btnfn }) {
    //const btntype = type ? type : 'submit';
    const variant = loading ? 'outline' : 'default';
    return (_jsx(_Fragment, { children: _jsx(Button, { type: type, className: cn('cursor-pointer', fullwidth && 'w-full'), variant: variant, onClick: btnfn ? btnfn : undefined, children: loading ?
                _jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-muted-foreground font-text tracking-tight text-sm", children: "Loading..." }), _jsx(Spinner, {})] }) :
                _jsxs("span", { className: "flex items-center gap-2 font-sans", children: [_jsx("span", { children: text }), _jsx("span", { children: _jsx(MoveRight, {}) })] }) }) }));
}
