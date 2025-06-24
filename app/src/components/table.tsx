import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Table as TTable,
  type Header,
  type Row,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";

// import { DeleteIcon, RenameIcon } from "../icons";
import { Trash2, FolderPen } from "lucide-react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    updateHeader: (index: number, id: string, value: string) => void;
    removeColumn: (index: number) => void;
  }
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    isNewColumn?: boolean;
  }
}

const RenameComp = forwardRef<HTMLInputElement, any>(
  ({ value, onUpdateHeader }, ref) => {
    const [inputValue, setInputValue] = useState(value);

    return (
      <div>
        <input
          ref={ref}
          autoFocus
          className="w-full p-1 flex items-center rounded-sm outline-1 
      outline-gray-300 -outline-offset-1 focus-within:outline-2 
        focus-within:-outline-offset-2 focus-within:outline-gray-400"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={(e) => {
            e.preventDefault();
            onUpdateHeader(inputValue);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onUpdateHeader(inputValue);
          }}
        />
      </div>
    );
  },
);

type TableHeaderProps = {
  header: Header<any, unknown>;
  table: TTable<any>;
  isResizable: boolean;
  onCreateColumn?: () => void;
  onRemoveColumn?: (id: string) => void;
};

const TableHeader = ({
  header,
  isResizable,
  table,
  onCreateColumn,
  onRemoveColumn,
}: TableHeaderProps) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  // Hide context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      key={header.id}
      className={cn(
        `relative flex items-center cursor-pointer group hover:bg-slate-100`,
        {
          "justify-center": header.id === "addColumn",
          "border-r-1 border-outline":
            !header.column.columnDef.meta?.isNewColumn,
          "pl-1":
            header.id !== "addColumn" &&
            !header.column.columnDef.meta?.isNewColumn,
        },
      )}
      style={{
        width: header.getSize(),
      }}
      onClick={() => {
        if (header.id === "addColumn" && onCreateColumn) {
          onCreateColumn();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (header.id !== "addColumn") {
          setShowContextMenu(true);
        }
      }}
    >
      {header.column.columnDef.meta?.isNewColumn ? (
        flexRender(header.column.columnDef.header, header.getContext())
      ) : (
        <div className="text-nowrap overflow-hidden">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
      )}

      {isResizable && header.id !== "addColumn" && (
        <div
          onDoubleClick={() => header.column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={`resizer ${table.options.columnResizeDirection} ${header.column.getIsResizing() ? "isResizing" : ""}`}
        />
      )}

      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="text-sm absolute w-45 border-1 border-accent bg-white top-10 left-0 rounded-md z-50 shadow"
        >
          <div className="flex items-center gap-1 rounded-md p-2 w-full hover:bg-gray-100">
            <div className="border-1 border-gray-500 rounded-sm p-1">
              <FolderPen />
            </div>
            <RenameComp
              value={header.column.columnDef.header}
              onUpdateHeader={(value: string) => {
                table.options.meta?.updateHeader(
                  header.index,
                  header.id,
                  value,
                );
              }}
            />
          </div>
          <div
            // https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={() => {
              onRemoveColumn && onRemoveColumn(header.id);
            }}
            className="flex items-center rounded-md p-2 text-destructive w-full hover:bg-gray-100"
          >
            <Trash2 />
            <span>️ Remove</span>
          </div>
        </div>
      )}
    </div>
  );
};

type TableRowProps = {
  row: Row<any>;
  onRemoveRow: (index: number) => void;
};

const TableRow = ({ row, onRemoveRow }: TableRowProps) => (
  <div key={row.id} className="h-9 flex group border-b-1 border-outline">
    {row.getVisibleCells().map((cell) => (
      <div
        key={cell.id}
        className="flex items-center border-r-1 border-outline text-nowrap bg-white relative group-hover:bg-gray-100"
        style={{
          width: cell.column.getSize(),
        }}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
        {cell.column.getIndex() === 0 && (
          <div
            onClick={() => {
              onRemoveRow(row.index);
            }}
            className="text-destructive bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-1 text-sm absolute right-1 invisible group-hover:visible"
          >
            <Trash2 />
          </div>
        )}
      </div>
    ))}
  </div>
);

export type TableProps = {
  data: any[];
  columns: ColumnDef<any, any>[];
  isResizable?: boolean;
  onCreateColumn?: () => void;
  onRemoveColumn?: (id: string) => void;
  setColumns?: React.Dispatch<React.SetStateAction<ColumnDef<any, any>[]>>;
};

export const Table = ({
  data: _data,
  columns,
  onCreateColumn,
  onRemoveColumn,
  setColumns,
  isResizable = false,
}: TableProps) => {
  const [data, setData] = useState(_data);
  // const [columns, setColumns] = useState(_columns);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 150,
      minSize: 100,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        // skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
      updateHeader: (colIndex, colId, value) => {
        setColumns &&
          setColumns((old) =>
            old.map((col, index) => {
              if (index === colIndex && col.id === colId) {
                if (col.meta?.isNewColumn) {
                  delete col.meta.isNewColumn;
                }
                return {
                  ...old[colIndex]!,
                  id: value === "" ? `custom-col-${Math.random()}` : value,
                  header: value,
                };
              }
              return col;
            }),
          );
      },
      removeColumn: (colIndex) => {
        setColumns &&
          setColumns((old) =>
            old.filter((_, index) => {
              return index !== colIndex;
            }),
          );
      },
    },
  });

  if (!data.length) {
    return (
      <div className="flex h-80 flex-col items-center justify-center bg-white text-gray-500">
        <h4>No Entries Found</h4>
      </div>
    );
  }

  return (
    <div
      className="border-t-1 border-l-1 border-outline"
      style={{
        width: table.getTotalSize(),
      }}
    >
      <div className="thead">
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="flex h-10 border-b-1 border-outline"
          >
            {headerGroup.headers.map((header) => (
              <TableHeader
                key={header.id}
                header={header}
                isResizable={isResizable}
                table={table}
                onCreateColumn={onCreateColumn}
                onRemoveColumn={onRemoveColumn}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="tbody">
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            row={row}
            onRemoveRow={(index) => {
              setData((old) => old.filter((_, idx) => idx !== index));
            }}
          />
        ))}
      </div>
    </div>
  );
};
