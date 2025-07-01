'use client'
import React, { useEffect } from 'react'
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface SearchStatusProps {
  onFiltersChange: (filters: string[]) => void;
  initialFilters?: string[];
  filterOptions?: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  className?: string;
}

export default function SearchStatus({ 
  onFiltersChange, 
  initialFilters = [], 
  filterOptions = [
    { value: 'reject', label: 'Reject' },
    { value: 'highest_score', label: 'Highest Score' },
    { value: 'pending', label: 'Pending' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'completed', label: 'Completed' },
    { value: 'closed', label: 'Closed' },
  ],
  placeholder = "More Filters",
  className = ""
}: SearchStatusProps) {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>(initialFilters);

  useEffect(() => {
    setSelectedFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterSelect = (value: string) => {
    if (!selectedFilters.includes(value)) {
      const newFilters = [...selectedFilters, value];
      setSelectedFilters(newFilters);
      onFiltersChange(newFilters);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    const newFilters = selectedFilters.filter(filter => filter !== filterToRemove);
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className='flex items-center gap-2'>
        <Select  onValueChange={handleFilterSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedFilters.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-2'>
          {selectedFilters.map((filter) => {
            const filterLabel = filterOptions.find(opt => opt.value === filter)?.label || filter;
            return (
              <Button 
                variant="outline"
                key={filter}
              >
                <span className='capitalize'>{filterLabel.replace('_', ' ')}</span>
                <button 
                  onClick={() => removeFilter(filter)}
                  className='hover:text-red-500 transition-colors'
                >
                  <X className='w-4 h-4' />
                </button>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  )
}


