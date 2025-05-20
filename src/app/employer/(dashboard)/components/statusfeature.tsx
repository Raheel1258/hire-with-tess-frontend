"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

interface StatusProps {
  Status: string;
  updateStatus: (status: string) => void;
}

export function DropDownCustomStatus({ Status, updateStatus }: StatusProps) {
  const [selectedStatus, setSelectedStatus] = React.useState(Status);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    updateStatus(value);
  };
  const getButtonStyle = () => {
    switch (selectedStatus) {
      case "closed":
        return "bg-red-100 text-red-800 border-red-400";
      case "active":
        return "bg-green-100 text-green-800 border-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Badge
          variant="outline"
          className={`capitalize ${getButtonStyle()} w-full`}
        >
          {selectedStatus}<ChevronDown />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedStatus}
          onValueChange={handleStatusChange}
        >
          <DropdownMenuRadioItem className=" text-green-800 border-green-400" value="active">Active</DropdownMenuRadioItem>
          <DropdownMenuRadioItem className=" text-red-800 border-red-400" value="closed">Closed</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
