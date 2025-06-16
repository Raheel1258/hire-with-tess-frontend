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

  return (
    <Box position="relative">
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
            height: '250px',
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
        value={value}
        onChange={isSalary ? handleSalaryChange : onChange}
      />
      {children && (
        <Box
          position="absolute"
          top="50%"
          left="16px"
          sx={{ transform: 'translateY(-50%)' }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

export default InputBox;
