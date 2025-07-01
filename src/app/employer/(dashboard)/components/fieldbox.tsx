import TextField from '@mui/material/TextField';
import React, { useRef } from 'react';
import { Box } from '@mui/material';

interface CustomInputProps {
  name?: string;
  label: string;
  placeholder?: string;
  type?: string;
  currencyName?: string;
  jobTypeName?: string;
  icon?: React.ReactNode;
  readOnly?: boolean;
  color?: string;
  children?: React.ReactNode;
  value?: string | number;
  onChange?: (value: string) => void;
  isSalary?: boolean;
}

const InputBox: React.FC<CustomInputProps> = ({ label, placeholder, children, value, onChange, isSalary = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    let value = e.target.value.replace(/[^\d,]/g, '');
  
    const commaCount = (value.match(/,/g) || []).length;
    if (commaCount > 1) {
      value = value.replace(/,/g, '');
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    onChange(value);
  };

  if (children) {
    return (
      <Box className="w-full">
        <Box
          className="w-full border border-gray-300 rounded-[14px] p-4 min-h-[200px] bg-white"
          sx={{
            '@media (max-width: 768px)': {
              padding: '12px',
              minHeight: '150px',
            },
          }}
        >
          <Box
            className="text-sm font-medium text-gray-700 mb-3"
            sx={{
              '@media (max-width: 768px)': {
                fontSize: '14px',
                marginBottom: '8px',
              },
            }}
          >
            {label}
          </Box>
          <Box
            className="w-full space-y-3"
            sx={{
              '@media (max-width: 768px)': {
                gap: '8px',
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box position="relative" className="w-full">
      <TextField
        inputRef={inputRef}
        fullWidth
        label={label}
        placeholder={placeholder}
        autoComplete="off"
        variant="outlined"
        type="text"
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            minHeight: '60px',
            borderRadius: '14px',
            fontSize: '16px',
            fontWeight: 400,
            padding: '16px 14px',
            '@media (max-width: 768px)': {
              fontSize: '14px',
              padding: '12px 10px',
            },
          },
          '& .MuiInputBase-input': {
            color: 'black',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            '&::placeholder': {
              color: 'gray',
              opacity: 1,
              fontSize: '14px',
              fontWeight: 400,
              '@media (max-width: 768px)': {
                fontSize: '12px',
              },
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
            '@media (max-width: 768px)': {
              fontSize: '14px',
            },
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
        value={value}
        onChange={isSalary ? handleSalaryChange : onChange}
      />
    </Box>
  );
};

export default InputBox;
