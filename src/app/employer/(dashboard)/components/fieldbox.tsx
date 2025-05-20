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
}

const InputBox: React.FC<CustomInputProps> = ({ label, placeholder, children }) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
            height: '174px',
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
