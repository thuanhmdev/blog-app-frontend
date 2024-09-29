"use client";

import IndeterminateCheckbox from "@/components/IndeterminateCheckbox";
import Popup from "@/components/popup";
import { sendRequest } from "@/http/http";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowBigRight, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

function CommentTable() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [comments, setComments] = useState<TComment[]>([]);
  const [rowId, setRowId] = useState<String>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleFetchComment = async () => {
    let url = `/blog-api/blogs/comments`;
    if (id) {
      url = `/blog-api/blogs/comments/${id}`;
    }
    const result = await sendRequest<TResponse<TComment[]>>({
      url: url,
      method: "GET",
      typeComponent: "CSR",
    });
    if (result.statusCode <= 299 && result.data) {
      setComments(result.data);
    }

    setLoading(false);
  };
  useEffect(() => {
    handleFetchComment();
  }, [id]);

  const handleChangeShowPopup = (value: boolean) => {
    setShowPopup(value);
  };

  const handleShowDeleteComment = (id: string) => {
    setRowId(id);
    handleChangeShowPopup(!showPopup);
  };

  const handleAcceptDelete = async () => {
    const result = await sendRequest<any>({
      url: `/blog-api/blogs/comments/${rowId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      typeComponent: "CSR",
    });

    if (result.statusCode <= 299) {
      handleFetchComment();
      toast.success("Deleted successfully");
    } else {
      toast.error(result.message);
    }
    setRowId("");
  };

  const columns: ColumnDef<TComment>[] = [
    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }) => (
        <div className="line-clamp-3">{row.getValue("content")}</div>
      ),
      size: 400,
      minSize: 200,
      maxSize: 500,
    },

    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-x-2 py-2">
            <div
              className="rounded-full  bg-center bg-no-repeat bg-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px] xl:w-[48px] xl:h-[48px]"
              style={{
                backgroundImage: `url(${
                  (row.getValue("user") as TUser)?.imageProvider ??
                  (row.getValue("user") as TUser)?.image
                })`,
              }}
            ></div>
            <p className="text-blue-500 font-semibold text-xs md:text-sm xl:text-base">
              {(row.getValue("user") as TUser)?.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "blogId",
      header: "View blog",
      cell: ({ row }) => (
        <Link
          href={`/blog/${row.getValue("blogId")}`}
          className="flex text-blue-400"
        >
          Preview <ArrowBigRight />
        </Link>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const a = new Date(row.getValue("createdAt") as Date);
        return (
          <div>
            {dayjs(row.getValue("createdAt")).format("MMMM D, YYYY h:mm A")}
          </div>
        );
      },
    },

    {
      accessorKey: "id",
      enableHiding: false,
      header: "Action",
      cell: ({ row }) => {
        return (
          <Trash2
            className="text-red-600 w-[16px] hover:cursor-pointer"
            onClick={() => handleShowDeleteComment(row.getValue("id"))}
          />
        );
      },
      size: 50,
    },
  ];

  const table = useReactTable({
    data: comments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "rtl",
    state: {
      sorting,
      pagination,
    },
    defaultColumn: {
      size: 100, //starting column size
    },
  });

  return (
    <div>
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <div
            className="w-12 h-12 rounded-full animate-spin
                        border-4 border-solid border-blue-500 border-t-transparent"
          ></div>
        </div>
      ) : (
        <>
          <Popup
            isOpen={showPopup}
            onShowPopup={handleChangeShowPopup}
            onAccept={handleAcceptDelete}
          />

          <div className="block max-w-full h-[84vh] overflow-scroll">
            <div className="py-2">
              <input
                type="text"
                className=" rounded-lg px-3 py-1 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                placeholder="Search by title"
                value={table.getColumn("title")?.getFilterValue() as string}
                onChange={(e) =>
                  table.getColumn("title")?.setFilterValue(e.target.value)
                }
              />
            </div>

            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="text-start"
                        style={{ width: `${header.getSize()}px` }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === "asc"
                                  ? "Sort ascending"
                                  : header.column.getNextSortingOrder() ===
                                    "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                                : undefined
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b-2 hover:bg-slate-100 ">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
          </div>
          <div className="h-2"></div>
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
export default CommentTable;
