"use client";
import { CaretSortIcon } from "@radix-ui/react-icons";
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
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crypto, CryptosApiResponse } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<Crypto>[] = [
  {
    accessorKey: "cmc_rank",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          #
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("cmc_rank")}</div>
    ),
  },
  {
    accessorKey: "symbol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Simbolo
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("symbol")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { name, symbol, id, slug } = row.original;
      const iconUrl = id
        ? `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`
        : "https://via.placeholder.com/64"; // URL alternativa en caso de que 'platform.id' sea nulo

      return (
        <div className="flex items-center space-x-2">
          <Link
            href={`https://coinmarketcap.com/currencies/${slug}/`}
            target="_blank"
            className="hover:underline flex gap-2 items-center">
            <Image
              src={iconUrl}
              alt={`${name} icon`}
              className="h-6 w-6"
              width={24}
              height={24}
            />
            <span className="flex gap-2">
              <p className="whitespace-nowrap">{name}</p>
              <p className="text-gray-500 dark:text-gray-400">{symbol}</p>
            </span>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.price", // Acceso anidado al precio
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Precio
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.quote?.USD?.price; // Acceso seguro al precio
      return (
        <div className="whitespace-nowrap text-right">
          {price
            ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.percent_change_1h",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          1h %
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percent = row.original.quote?.USD?.percent_change_1h;
      return (
        <div
          className={`whitespace-nowrap text-right ${
            percent && percent > 0 ? "text-green-500" : "text-red-500"
          }`}>
          {percent ? percent.toFixed(2) + "%" : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.percent_change_24h",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          24h %
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percent = row.original.quote?.USD?.percent_change_24h;
      return (
        <div
          className={`whitespace-nowrap text-right ${
            percent && percent > 0 ? "text-green-500" : "text-red-500"
          }`}>
          {percent ? percent.toFixed(2) + "%" : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.percent_change_7d",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          7d %
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percent = row.original.quote?.USD?.percent_change_7d;
      return (
        <div
          className={`whitespace-nowrap text-right ${
            percent && percent > 0 ? "text-green-500" : "text-red-500"
          }`}>
          {percent ? percent.toFixed(2) + "%" : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.percent_change_30d",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          30d %
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percent = row.original.quote?.USD?.percent_change_30d;
      return (
        <div
          className={`whitespace-nowrap text-right ${
            percent && percent > 0 ? "text-green-500" : "text-red-500"
          }`}>
          {percent ? percent.toFixed(2) + "%" : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.percent_change_60d",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          60d %
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percent = row.original.quote?.USD?.percent_change_60d;
      return (
        <div
          className={`whitespace-nowrap text-right ${
            percent && percent > 0 ? "text-green-500" : "text-red-500"
          }`}>
          {percent ? percent.toFixed(2) + "%" : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.percent_change_90d",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          90d %
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percent = row.original.quote?.USD?.percent_change_90d;
      return (
        <div
          className={`whitespace-nowrap text-right ${
            percent && percent > 0 ? "text-green-500" : "text-red-500"
          }`}>
          {percent ? percent.toFixed(2) + "%" : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "num_market_pairs",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Número de pares de mercado
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const marketCap = row.original.num_market_pairs;
      return (
        <div className="whitespace-nowrap text-right">
          {marketCap ? `${marketCap.toLocaleString("en-US")}` : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.market_cap",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Capitalización de mercado
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const marketCap = row.original.quote?.USD?.market_cap;
      return (
        <div className="whitespace-nowrap text-right">
          {marketCap ? `${marketCap.toLocaleString("en-US")}` : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "quote.USD.market_cap_dominance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Dom. Capitalizació de mercado
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const marketCap = row.original.quote?.USD?.market_cap_dominance;
      return (
        <div className="whitespace-nowrap text-right">
          {marketCap ? `%${marketCap.toLocaleString("en-US")}` : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "circulating_supply",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent float-right pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Suministro Circulante
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const supply = row.original.circulating_supply;
      return (
        <div className="whitespace-nowrap text-right">
          {supply ? supply.toLocaleString("en-US") : "N/A"}
        </div>
      );
    },
  },
];

interface CryptosDataTableProps {
  cryptosData?: CryptosApiResponse;
}

export function CryptosDataTable({ cryptosData }: CryptosDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ symbol: false });
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 30,
  });
  const cryptos = cryptosData;
  const data = React.useMemo(() => {
    return cryptos?.data ?? [];
  }, [cryptos]);

  const table = useReactTable<Crypto>({
    data,
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
      pagination, // Vincula el estado de paginación
    },
    onPaginationChange: setPagination, // Actualiza el estado de paginación
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-end py-4">
        <div className="w-1/2 gap-2 flex items-center">
          <Input
            placeholder="Filtrar por símbolo (ej. BTC)..."
            value={
              (table.getColumn("symbol")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("symbol")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filtrar por nombre..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center justify-end space-x-2">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onDoubleClick={() =>
                    window.open(
                      `https://coinmarketcap.com/currencies/${row.original.slug}`,
                      "_blank"
                    )
                  }>
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
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-5" />
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
