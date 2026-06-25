import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../services/applicationService";
import type { Application } from "../types";
import { useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
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

  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const columnHelper = createColumnHelper<Application>();

  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="checkbox"
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
    }),
    columnHelper.accessor("company", {
      header: "Company",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor("title", {
      header: "Job Title",
      cell: (info) => (
        <span className="text-center block">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("appliedDate", {
      header: "Applied Date",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    }),
    columnHelper.accessor("updatedAt", {
      header: "Last updated",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    }),
    columnHelper.accessor("status", {
      header: "Stage",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
    },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isError) {
    return <p className="p-4 text-error text-sm">Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p className="p-4 text-sm">Loading applications...</p>;
  }

  const selectedRowIds = Object.keys(rowSelection);

  return (
    <div className="rounded-md bg-bg-primary relative border border-border">
      <div className="p-4 border-b border-b-border-subtle shadow-xs flex justify-between items-center">
        <div className="p-1 w-fit rounded-md bg-bg-tertiary flex items-center gap-2">
          <button className="filter-item active">All</button>
          <button className="filter-item">Assessment</button>
          <button className="filter-item">Interview</button>
          <button className="filter-item">Rejected</button>
        </div>
        {selectedRowIds.length > 0 && (
          <span className="text-sm text-text-secondary font-medium">
            {selectedRowIds.length} row(s) selected
          </span>
        )}
      </div>

      {data.length > 0 &&
        table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="px-4 py-2 bg-bg-secondary shadow-xs text-sm grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] place-items-center font-medium"
          >
            {headerGroup.headers.map((header) => (
              <div key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </div>
            ))}
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
        ) : (
          <div className="text-sm flex flex-col items-center gap-2 py-8">
            <p className="text-base font-medium">No applications to show.</p>
            <span className="text-text-secondary">
              Try adding a new application
            </span>
            <button className="px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-bg-primary">
              Add application
            </button>
          </div>
        )}
      </div>

      {data.length > 7 && (
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
