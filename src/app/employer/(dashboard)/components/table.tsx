import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Loader2, Trash } from 'lucide-react';

interface TableProps {
  header: string[];
  paginationstart: number;
  paginationend: number;
  subheader: (string | React.ReactNode)[][];
  showTrashIcon?: boolean;
  showEyeIcon?: boolean;
  onDelete?: (rowIndex: number) => void;
  onView?: (rowIndex: number) => void;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

function ActionIcons({
  rowIndex,
  showEyeIcon,
  showTrashIcon,
  onView,
  onDelete,
}: {
  rowIndex: number;
  showEyeIcon: boolean;
  showTrashIcon: boolean;
  onView?: (rowIndex: number) => void;
  onDelete?: (rowIndex: number) => void;
}) {
  if (!showEyeIcon && !showTrashIcon) return null;

  return (
    <div className="flex items-center gap-3">
      {showEyeIcon && (
        <button
          type="button"
          onClick={() => onView?.(rowIndex)}
          className="rounded-md p-1 text-[#f7941D] transition-colors hover:bg-orange-50"
          aria-label="View details"
        >
          <Eye className="h-4 w-4" />
        </button>
      )}
      {showTrashIcon && (
        <button
          type="button"
          onClick={() => onDelete?.(rowIndex)}
          className="rounded-md p-1 text-[#f7941D] transition-colors hover:bg-orange-50"
          aria-label="Delete"
        >
          <Trash className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function TableComponent({
  header,
  paginationstart,
  paginationend,
  subheader,
  showTrashIcon = false,
  showEyeIcon = false,
  onDelete,
  onView,
  onPageChange,
  isLoading = false,
}: TableProps) {
  const hasExtraActionColumn = showTrashIcon || showEyeIcon;
  const totalColumns = header.length + (hasExtraActionColumn ? 1 : 0);
  const currentPage = paginationstart || 1;
  const totalPages = Math.max(paginationend || 1, 1);

  const handlePreviousPage = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <Table className="w-full min-w-[640px]">
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50/80 hover:bg-gray-50/80">
              {header.map((head, index) => (
                <TableHead
                  key={index}
                  className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#535862] md:px-4 md:text-sm md:normal-case md:tracking-normal"
                >
                  {head}
                </TableHead>
              ))}
              {hasExtraActionColumn && (
                <TableHead className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#535862] md:px-4 md:text-sm md:normal-case md:tracking-normal">
                  Action
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={totalColumns} className="h-48 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin text-[#f7941D]" />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : subheader.length === 0 ? (
              <TableRow>
                <TableCell colSpan={totalColumns} className="h-48 text-center text-sm text-gray-500">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              subheader.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-b border-gray-100 transition-colors hover:bg-orange-50/30"
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className="whitespace-nowrap px-3 py-3 font-normal text-sm text-gray-900 md:px-4"
                    >
                      {cell}
                    </TableCell>
                  ))}
                  {hasExtraActionColumn && (
                    <TableCell className="whitespace-nowrap px-3 py-3 md:px-4">
                      <ActionIcons
                        rowIndex={rowIndex}
                        showEyeIcon={showEyeIcon}
                        showTrashIcon={showTrashIcon}
                        onView={onView}
                        onDelete={onDelete}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/50 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex w-full gap-2 sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={handlePreviousPage}
            disabled={currentPage <= 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || isLoading}
          >
            Next
          </Button>
        </div>
        <p className="text-center text-sm text-gray-500 sm:text-right">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}
