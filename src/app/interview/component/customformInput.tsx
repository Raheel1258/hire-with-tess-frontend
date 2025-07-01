import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import FormControl from '@mui/material/FormControl';
import { useSkillStore } from '@/store/Employer/InputStore';
import React, { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface CustomInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  currencyName?: string;
  jobTypeName?: string;
  salaryTypeName?: string;
  icon?: React.ReactNode;
  readOnly?: boolean;
  color?: string;
  children?: React.ReactNode;
  value?: string | number;
  currencyValue?: string;
  salaryTypeValue?: string;
  onChange?: (value: string) => void;
}

const CustomInputForm: React.FC<CustomInputProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  currencyName,
  jobTypeName,
  salaryTypeName,
  icon,
  children,
  readOnly,
  value,
  currencyValue,
  salaryTypeValue,
  onChange,
}) => {
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isEditable } = useSkillStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const actualType = type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type;

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    
    // Allow only digits and commas
    let value = e.target.value.replace(/[^\d,]/g, '');
    
    // Format the number with commas
    if (value) {
      // Remove existing commas first
      value = value.replace(/,/g, '');
      // Add commas in the correct positions
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    onChange(value);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || ''}
      render={({ field, fieldState }) => (
        <Box sx={{ width: '100%', position: 'relative' }}>
          <TextField
            {...field}
            autoFocus={isEditable}
            inputRef={inputRef}
            fullWidth
            label={label}
            placeholder={placeholder}
            autoComplete="off"
            variant="outlined"
            type={name === 'salary' ? 'text' : actualType}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || ''}
            slotProps={{ inputLabel: { shrink: true } }}
            value={jobTypeName ? '' : (name === 'salary' ? (value || field.value || '') : (value || field.value || ''))}
            onChange={name === 'salary' ? handleSalaryChange : field.onChange}
            InputProps={{
              readOnly,
              inputProps: name === 'salary' ? { min: 0 } : undefined,
              startAdornment: jobTypeName ? (
                <InputAdornment position="start">
                  <Controller
                    name={jobTypeName}
                    control={control}
                    defaultValue={jobTypeName}
                    render={({ field }) => (
                      <FormControl sx={{ minWidth: 140 }}>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[140px] text-black">
                            <SelectValue placeholder="Job Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Onsite" className="text-black">Onsite</SelectItem>
                            <SelectItem value="Hybrid" className="text-black">Hybrid</SelectItem>
                            <SelectItem value="Remote" className="text-black">Remote</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                </InputAdornment>
              ) : currencyName ? (
                <InputAdornment position="start">
                  <div className="flex gap-2">
                    <Controller
                      name={salaryTypeName}
                      control={control}
                      defaultValue={salaryTypeValue}
                      render={({ field }) => (
                        <FormControl>
                          <Select onValueChange={field.onChange} value={salaryTypeValue || field.value}>
                            <SelectTrigger className="w-[120px] text-black text-[16px] font-normal">
                              <SelectValue placeholder={salaryTypeValue || "Per Hour"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="per_hour" className="text-black">Per Hour</SelectItem>
                              <SelectItem value="per_month" className="text-black">Per Month</SelectItem>
                              <SelectItem value="per_year" className="text-black">Per Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      )}
                    />
                    <Controller
                      name={currencyName}
                      control={control}
                      defaultValue={currencyValue}
                      render={({ field }) => (
                        <FormControl>
                          <Select onValueChange={field.onChange} value={currencyValue || field.value}>
                            <SelectTrigger className="w-[100px] text-black text-[16px] font-normal">
                              <SelectValue placeholder={currencyValue || "USD"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD" className="text-black">USD</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </div>
                </InputAdornment>
              ) : null,
              endAdornment:
                type === 'password' ? (
                  <InputAdornment position="end">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsPasswordVisible(!isPasswordVisible);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {isPasswordVisible ? <Eye /> : <EyeOff />}
                    </span>
                  </InputAdornment>
                ) : icon ? (
                  <InputAdornment position="end">{icon}</InputAdornment>
                ) : null,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '60px',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: 400,
              },
              '& .MuiInputBase-input': {
                color: 'black',   
                '&::placeholder': {
                  color: 'gray',
                  opacity: 1,
                  fontSize: '14px',
                  fontWeight: 400,
                },
              },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'black', 
                color: 'black',
                opacity: 1,
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
                transition: 'color 0.2s',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'black',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                color: 'black', 
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'gray',
              },
            }}
          />
          {children && <Box mt={2}>{children}</Box>}
        </Box>
      )}
    />
  );
};

export default CustomInputForm;
