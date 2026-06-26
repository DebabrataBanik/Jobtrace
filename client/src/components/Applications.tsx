import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../services/applicationService";
import type { Application } from "../types";
import { useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnFiltersState,
  type RowSelectionState,
  type PaginationState,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

export default function Applications() {
  const {
    data = [],
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 7,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<Application>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Application, any>[] = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <label
          className={`checkbox-label ${table.getFilteredRowModel().rows.length === 0 ? "cursor-default" : ""}`}
        >
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="checkbox"
            disabled={table.getFilteredRowModel().rows.length === 0}
          />
        </label>
      ),
      cell: ({ row }) => (
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            className="checkbox"
          />
        </label>
      ),
      enableGlobalFilter: false,
      enableSorting: false,
    }),
    columnHelper.accessor("company", {
      header: "Company",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      enableGlobalFilter: true,
    }),
    columnHelper.accessor("title", {
      header: "Job Title",
      cell: (info) => (
        <span className="text-center block">{info.getValue()}</span>
      ),
      enableGlobalFilter: true,
    }),
    columnHelper.accessor("appliedDate", {
      header: "Applied Date",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      enableGlobalFilter: false,
    }),
    columnHelper.accessor("updatedAt", {
      header: "Last updated",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      enableGlobalFilter: false,
    }),
    columnHelper.accessor("status", {
      header: "Stage",
      enableGlobalFilter: false,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
      columnFilters,
      globalFilter,
      sorting,
    },
    maxMultiSortColCount: 3,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const currentStatusFilter =
    columnFilters.find((f) => f.id === "status")?.value ?? "";

  if (isError) {
    return <p className="p-4 text-error text-sm">Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p className="p-4 text-sm">Loading applications...</p>;
  }

  const selectedRowIds = Object.keys(rowSelection);

  return (
    <div className="rounded-md bg-bg-primary relative border border-border">
      <div className="p-4 border-b border-b-border-subtle flex justify-between items-center gap-4">
        <div className="p-1 w-fit rounded-md bg-bg-tertiary flex items-center gap-2">
          <button
            onClick={() => setColumnFilters([])}
            className={`filter-item ${currentStatusFilter === "" ? "active" : ""}`}
            disabled={data.length === 0}
          >
            All
          </button>
          <button
            onClick={() => setColumnFilters([{ id: "status", value: "OA" }])}
            className={`filter-item ${currentStatusFilter === "OA" ? "active" : ""}`}
            disabled={data.length === 0}
          >
            Assessment
          </button>
          <button
            onClick={() =>
              setColumnFilters([{ id: "status", value: "Interview" }])
            }
            className={`filter-item ${currentStatusFilter === "Interview" ? "active" : ""}`}
            disabled={data.length === 0}
          >
            Interview
          </button>
          <button
            onClick={() =>
              setColumnFilters([{ id: "status", value: "Rejected" }])
            }
            className={`filter-item ${currentStatusFilter === "Rejected" ? "active" : ""}`}
            disabled={data.length === 0}
          >
            Rejected
          </button>
        </div>
        {selectedRowIds.length > 0 && (
          <span className="block ml-auto text-sm text-text-secondary font-medium">
            {selectedRowIds.length} row(s) selected
          </span>
        )}
        <div>
          <label className="flex items-center relative">
            <input
              type="search"
              className="search-input text-sm peer"
              placeholder="Search"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              disabled={data.length === 0}
            />
            <SearchIcon
              className="absolute left-2.5 text-text-tertiary peer-focus:text-text-primary"
              size={15}
            />
          </label>
        </div>
      </div>

      {table.getHeaderGroups().map((headerGroup) => (
        <div
          key={headerGroup.id}
          className="px-4 py-2 bg-bg-secondary shadow-md text-sm grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] place-items-center font-medium"
        >
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const isSorted = header.column.getIsSorted();

            if (!canSort) {
              return (
                <div key={header.id} className="px-1 text-sm select-none">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </div>
              );
            }

            return (
              <button
                key={header.id}
                onClick={() => header.column.toggleSorting(undefined, true)}
                className="flex items-center gap-2 select-none cursor-pointer"
                disabled={table.getFilteredRowModel().rows.length === 0}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}

                <span className="sorting-container">
                  {isSorted === "asc" && <ChevronUpIcon size={10} />}
                  {isSorted === "desc" && <ChevronDownIcon size={10} />}
                  {!isSorted && (
                    <>
                      <ChevronUpIcon size={8} className="opacity-25" />
                      <ChevronDownIcon size={8} className="opacity-25" />
                    </>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      ))}

      <div>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className={`p-4 text-sm grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] place-items-center border-t border-t-border-subtle ${
                row.getIsSelected() ? "bg-accent-subtle" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="text-sm flex flex-col items-center gap-2 py-8">
            <p className="text-base font-medium">No applications to show.</p>
            <span className="text-text-secondary">
              Try adding a new application
            </span>
            <button className="px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-bg-primary">
              Add application
            </button>
          </div>
        ) : (
          <div className="text-sm flex flex-col items-center gap-2 py-8">
            <p className="text-base font-medium">
              No matching applications found.
            </p>
          </div>
        )}
      </div>

      {table.getFilteredRowModel().rows.length > 7 && (
        <div className="p-4 px-7 border-t border-t-border-subtle flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 border border-border-subtle rounded-md bg-bg-primary disabled:opacity-50 text-xs font-medium cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 border border-border-subtle rounded-md bg-bg-primary disabled:opacity-50 text-xs font-medium cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
