"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter } from "../app/filter";
import { Proposal } from "@/lib/types";

export function SendProposalTable({
  sentProposals,
}: {
  sentProposals: Proposal[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [proposals, setProposals] = React.useState<Proposal[]>([]);

  React.useEffect(() => {
    setProposals(sentProposals);
  }, [sentProposals]);

  const statusOptions = React.useMemo(() => {
    const options = sentProposals.map((row) => row.status);
    const statuses = [...new Set(options)];
    return statuses.map((status) => ({ value: status, label: status }));
  }, [sentProposals]);

  const columns: ColumnDef<Proposal>[] = [
    {
      accessorKey: "jobId",
      header: "Job Id",
      cell: ({ row }) => {
        const jobId = parseInt(row.getValue("jobId"));
        return <div className="capitalize">{jobId}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return <div className="font-normal">{row.getValue("description")}</div>;
      },
    },

    {
      accessorKey: "createdAt",
      header: "Sent On",
      cell: ({ row }) => <div className="">{row.getValue("createdAt")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("status")}</div>
      ),
      filterFn: (row, id, value) => {
        // Here, explicitly specify the type of the 'value' parameter
        const typedValue = value as
          | "pending"
          | "processing"
          | "success"
          | "failed";
        return typedValue.includes(
          row.getValue(id) as "pending" | "processing" | "success" | "failed"
        );
      },
    },
    {
      accessorKey: "bid",
      header: () => <div className="">Bid Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("bid"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className=" font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.jobId)}
              >
                Copy Job ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: proposals,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-12 ">
      <div className="flex items-center py-4">
        <div className="flex items-center gap-3 py-4">
          <Input
            placeholder="Search a job Id..."
            value={(table.getColumn("jobId")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("jobId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-96 font-semibold border-green-900 dark:bg-purple-100 dark:text-purple-900"
          />
          {table.getColumn("status") && (
            <Filter
              column={table.getColumn("status")}
              title="Status"
              options={statusOptions}
            />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-green-300 dark:bg-purple-800 dark:hover:bg-purple-700"
            >
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border z-10 shadow-md bg-green-400 bg-opacity-20 dark:shadow-purple-300 my-4 z-80 dark:bg-purple-300 dark:bg-opacity-15">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="dark:hover:bg-purple-300/10"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-bold dark:text-white "
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="font-thin hover:text-green-800 dark:hover:bg-purple-300/10 dark:hover:text-purple-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
