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
import { Badge } from "../ui/badge";
import { useContractWrite } from "wagmi";
import { deworkContract } from "@/lib/contracts";

export function OngoingJobtable({
  ongoingProposals,
}: {
  ongoingProposals: Proposal[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [proposals, setProposals] = React.useState<Proposal[]>([]);

  const { data, isSuccess, isLoading, write } = useContractWrite({
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    abi: deworkContract.abi,
    functionName: "approveJobCompletion",
  });

  React.useEffect(() => {
    setProposals(ongoingProposals);
  }, [ongoingProposals]);

  const statusOptions = React.useMemo(() => {
    const options = ongoingProposals.map((row) => row.status);
    const statuses = [...new Set(options)];
    return statuses.map((status) => ({ value: status, label: status }));
  }, [ongoingProposals]);

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
      accessorKey: "createdBy",
      header: "Freelancer",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("createdBy")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className=" uppercase cursor-default font-semibold px-2 bg-green-50 hover:text-white hover:bg-green-900 dark:bg-purple-200 dark:text-purple-900 dark:hover:text-purple-300 dark:hover:bg-purple-900 inline-block rounded-full ">
          {row.getValue("status")}
        </div>
      ),
      filterFn: (row, id, value) => {
        // Here, explicitly specify the type of the 'value' parameter
        const typedValue = value as "pending" | "accepted" | "rejected";
        return typedValue.includes(
          row.getValue(id) as "pending" | "processing" | "success" | "failed"
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="">Start Date</div>,
      cell: ({ row }) => {
        return (
          <div className=" font-semibold px-2 bg-green-50 hover:text-white hover:bg-green-900 dark:bg-purple-200 dark:text-purple-900 dark:hover:text-purple-300 dark:hover:bg-purple-900 inline-block rounded-full ">
            {row.getValue("createdAt")}
          </div>
        );
      },
    },
    {
      accessorKey: "bid",
      header: () => <div className="">Budget</div>,
      cell: ({ row }) => {
        const amount = Number(row.getValue("bid")) / 10 ** 18;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className=" font-medium">{formatted} GHO</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const proposal = row.original;

        return (
          <Button
            onClick={() => {
              write({
                args: [proposal.jobId, proposal.proposalId],
              });
            }}
          >
            Approve Completion
          </Button>
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
