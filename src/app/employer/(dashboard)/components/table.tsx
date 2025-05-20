import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash } from 'lucide-react';

interface TableProps {
  header: string[];
  paginationstart: number;
  paginationend: number;
  subheader: (string | React.ReactNode)[][];
  showTrashIcon?: boolean;
  onDelete?: (rowIndex: number) => void; 
}

export default function TableComponent({
  header,
  paginationstart,
  paginationend,
  subheader,
  showTrashIcon = false,
  onDelete,
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto bg-white border rounded-md">
      <div className="min-h-[400px] flex flex-col justify-between">
        <Table className="w-full min-w-[600px]">
          <TableHeader>
            <TableRow>
              {header.map((head, index) => (
                <TableHead
                  key={index}
                  className="text-left font-roboto font-medium text-[#535862] whitespace-nowrap"
                >
                  {head}
                </TableHead>
              ))}
              {showTrashIcon && (
                <TableHead className="text-left font-roboto text-[#535862] whitespace-nowrap">
                  Action
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody className="border-t">
            {subheader.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className="font-normal font-open-sans whitespace-nowrap"
                  >
                    {cell}
                  </TableCell>
                ))}
                {showTrashIcon && (
                  <TableCell>
                    <Trash
                      className="w-4 h-4 text-[#f7941D] cursor-pointer"
                      onClick={() => onDelete?.(rowIndex)} 
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-t mt-6 gap-2 sm:gap-0">
          <div className="flex space-x-2">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
          <div className="text-sm text-gray-500 sm:text-right">
            Page {paginationstart} of {paginationend}
          </div>
        </div>
      </div>
    </div>
  );
}
