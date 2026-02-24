
import {  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis, } from "@/components/ui/pagination"

type PaginationProps = {
  value?: number
  totalPages:number,
  onChange: (page: number) => void
}


export default function ListPagination({value=1, totalPages, onChange}:PaginationProps){
    //const currentPage = filters.page|| 1;
    const pages:number[] = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return(
        <> 
    <Pagination>
      <PaginationContent>

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious onClick={()=> onChange(value - 1)} className="cursor-pointer" />
        </PaginationItem>

        {/* Pages with ellipsis every 5 */}
        {pages.map((pg, index) => {
          // Show the page
          if ((pg <= 5) || (pg % 5 === 0) || pg === totalPages) {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={()=> onChange(pg)}
                  isActive={pg === value}
                >
                  {pg}
                </PaginationLink>
              </PaginationItem>
            );
          }

          // Ellipsis after groups of 5
          if (pg % 5 === 1) {
            return (
              <PaginationItem key={`ellipsis-${pg}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext onClick={()=> onChange(value + 1)} className="cursor-pointer"/>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
        </>
    )
}