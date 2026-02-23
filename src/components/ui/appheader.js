import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SidebarTrigger } from "./sidebar";
import { Separator } from "./separator";
export function AppHeader() {
    //const { toggleSidebar } = useSidebar()
    return (_jsx(_Fragment, { children: _jsx("header", { className: "flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)", children: _jsxs("div", { className: "flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6", children: [_jsx(SidebarTrigger, { className: "-ml-1" }), _jsx(Separator, { orientation: "vertical", className: "mx-2 data-[orientation=vertical]:h-4" }), _jsx("div", {}), _jsx("div", { className: "ml-auto flex items-center gap-2" })] }) }) }));
}
