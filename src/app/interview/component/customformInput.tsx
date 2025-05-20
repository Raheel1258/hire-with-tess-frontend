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
import { useSkillStore } from '@/store/Employee/InputStore';
import React, { useRef } from 'react';
import { useToggleStore } from '@/store/Employee/Toggle.store';
import { Eye, EyeOff } from 'lucide-react';

interface CustomInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  currencyName?: string;
  jobTypeName?: string;
  icon?: React.ReactNode;
  readOnly?: boolean;
  color?: string;
  children?: React.ReactNode;
}

const CustomInputForm: React.FC<CustomInputProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  currencyName,
  jobTypeName,
  icon,
  children,
  readOnly,
}) => {
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isEditable } = useSkillStore();

  const { showPassword, toggleShowPassword } = useToggleStore();
  const actualType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
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
            type={actualType}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || ''}
            slotProps={{ inputLabel: { shrink: true } }}
            InputProps={{
              readOnly,
              startAdornment: jobTypeName ? (
                <InputAdornment position="start">
                  <Controller
                    name={jobTypeName}
                    control={control}
                    defaultValue="Onsite"
                    render={({ field }) => (
                      <FormControl sx={{ minWidth: 140 }}>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[140px] text-black">
                            <SelectValue placeholder="Job Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Onsite" className="text-black">
                              Onsite
                            </SelectItem>
                            <SelectItem value="Remote" className="text-black">
                              Remote
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                </InputAdornment>
              ) : currencyName ? (
                <InputAdornment position="start">
                  <Controller
                    name={currencyName}
                    control={control}
                    defaultValue="USD"
                    render={({ field }) => (
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[100px] text-black text-[16px] font-normal">
                            <SelectValue placeholder="USD" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD" className="text-black">
                              USD
                            </SelectItem>
                            <SelectItem value="PKR" className="text-black">
                              PKR
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                </InputAdornment>
              ) : null,
              endAdornment:
                type === 'password' ? (
                  <InputAdornment position="end">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleShowPassword();
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
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
                color: 'black', // User input or value
                '&::placeholder': {
                  color: 'gray', // Placeholder hint
                  opacity: 1,
                  fontSize: '14px',
                  fontWeight: 400,
                },
              },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'black', // Readonly still black
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
                color: 'black', // Floating label
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
