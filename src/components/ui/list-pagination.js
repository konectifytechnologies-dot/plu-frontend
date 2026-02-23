import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, } from "@/components/ui/pagination";
export default function ListPagination({ value = 1, totalPages, onChange }) {
    //const currentPage = filters.page|| 1;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return (_jsx(_Fragment, { children: _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { onClick: () => onChange(value - 1), className: "cursor-pointer" }) }), pages.map((pg, index) => {
                        // Show the page
                        if ((pg <= 5) || (pg % 5 === 0) || pg === totalPages) {
                            return (_jsx(PaginationItem, { children: _jsx(PaginationLink, { onClick: () => onChange(pg), isActive: pg === value, children: pg }) }, index));
                        }
                        // Ellipsis after groups of 5
                        if (pg % 5 === 1) {
                            return (_jsx(PaginationItem, { children: _jsx(PaginationEllipsis, {}) }, `ellipsis-${pg}`));
                        }
                        return null;
                    }), _jsx(PaginationItem, { children: _jsx(PaginationNext, { onClick: () => onChange(value + 1), className: "cursor-pointer" }) })] }) }) }));
}
