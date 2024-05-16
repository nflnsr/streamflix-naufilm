import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

function Pagination({
  pageNow,
  totalPages,
}: {
  pageNow: number;
  totalPages: number;
}) {
  return (
    <PaginationUI>
      <PaginationContent className="gap-3">
        <PaginationItem>
          <Button disabled={Number(pageNow) <= 1} className="p-0">
            <Link
              href={`/?page=${String(Number(pageNow) - 1)}`}
              className="flex size-full items-center justify-center rounded-md bg-neutral-600 px-3 text-amber-100 hover:bg-neutral-500"
            >
              Previous
            </Link>
          </Button>
        </PaginationItem>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, n) => (
            <PaginationItem key={n}>
              <Link href={`/?page=${n + 1}`}>
                <Button
                  className={`bg-neutral-600 text-amber-100 hover:bg-neutral-500 ${
                    pageNow === n + 1 && "bg-neutral-400"
                  }`}
                >
                  {n + 1}
                </Button>
              </Link>
            </PaginationItem>
          ))}
        </div>
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <Button disabled={Number(pageNow) === totalPages} className="p-0">
            <Link
              href={`/?page=${String(Number(pageNow) + 1)}`}
              className="flex size-full items-center justify-center rounded-md bg-neutral-600 px-3 text-amber-100 hover:bg-neutral-500"
            >
              Next
            </Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
}

export { Pagination };
