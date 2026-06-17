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
import FormHelperText from '@mui/material/FormHelperText';
import { useSkillStore } from '@/store/Employer/InputStore';
import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const formatNumber = (s: string) => {
  const clean = s.replace(/[^\d]/g, '');
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const cleanNumber = (s: string) => s.replace(/[^\d]/g, '');

const salaryAmountInputClass =
  'h-[52px] w-full rounded-[10px] border border-gray-200 bg-white px-3 text-base font-normal text-black outline-none transition-colors placeholder:text-slate-400 focus:border-[#1E4B8E] focus:ring-2 focus:ring-[#1E4B8E]/20 disabled:cursor-not-allowed disabled:bg-slate-50';

const SalaryRangeInput = React.forwardRef<HTMLInputElement, any>(
  function SalaryRangeInput(props, ref) {
    const { value, onChange, readOnly, disabled } = props;
    const stringValue = String(value ?? '');
    const [minRaw = '', maxRaw = ''] = stringValue.split('-');

    const fire = (newMin: string, newMax: string) => {
      const min = cleanNumber(newMin);
      const max = cleanNumber(newMax);
      const combined = min || max ? `${min}-${max}` : '';
      onChange({ target: { value: combined } });
    };

    return (
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Min amount</label>
          <input
            ref={ref}
            type="text"
            inputMode="numeric"
            value={formatNumber(minRaw)}
            placeholder="e.g. 50,000"
            readOnly={readOnly}
            disabled={disabled}
            onChange={(e) => fire(e.target.value, maxRaw)}
            className={salaryAmountInputClass}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Max amount</label>
          <input
            type="text"
            inputMode="numeric"
            value={formatNumber(maxRaw)}
            placeholder="e.g. 80,000"
            readOnly={readOnly}
            disabled={disabled}
            onChange={(e) => fire(minRaw, e.target.value)}
            className={salaryAmountInputClass}
          />
        </div>
      </div>
    );
  },
);

interface SalaryFieldProps {
  name: string;
  label: string;
  currencyName: string;
  salaryTypeName: string;
  readOnly?: boolean;
  currencyValue?: string;
  salaryTypeValue?: string;
  value?: string | number;
}

const SalaryField: React.FC<SalaryFieldProps> = ({
  name,
  label,
  currencyName,
  salaryTypeName,
  readOnly,
  currencyValue,
  salaryTypeValue,
  value,
}) => {
  const { control } = useFormContext();

  const salaryTypeSelect = (fullWidth = false) => (
    <Controller
      name={salaryTypeName}
      control={control}
      defaultValue={salaryTypeValue}
      render={({ field: salaryTypeField }) => (
        <div className={fullWidth ? 'w-full min-w-0' : 'shrink-0'}>
          <Select
            onValueChange={salaryTypeField.onChange}
            value={salaryTypeValue || salaryTypeField.value}
            disabled={readOnly}
          >
            <SelectTrigger
              className={
                fullWidth
                  ? '!w-full min-w-0 max-w-full text-black text-sm font-normal'
                  : 'w-[120px] text-black text-base font-normal'
              }
            >
              <SelectValue placeholder={salaryTypeValue || 'Per Hour'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="per_hour" className="text-black">
                Per Hour
              </SelectItem>
              <SelectItem value="per_month" className="text-black">
                Per Month
              </SelectItem>
              <SelectItem value="per_year" className="text-black">
                Per Year
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );

  const currencySelect = (fullWidth = false) => (
    <Controller
      name={currencyName}
      control={control}
      defaultValue={currencyValue}
      render={({ field: currencyField }) => (
        <div className={fullWidth ? 'w-full min-w-0' : 'shrink-0'}>
          <Select
            onValueChange={currencyField.onChange}
            value={currencyValue || currencyField.value}
            disabled={readOnly}
          >
            <SelectTrigger
              className={
                fullWidth
                  ? '!w-full min-w-0 max-w-full text-black text-sm font-normal'
                  : 'w-[100px] text-black text-base font-normal'
              }
            >
              <SelectValue placeholder={currencyValue || 'USD'} />
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
        </div>
      )}
    />
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || ''}
      rules={{ required: 'Salary is required.' }}
      render={({ field, fieldState }) => (
        <Box sx={{ width: '100%', minWidth: 0, maxWidth: '100%' }}>
          <label className="mb-2 block text-left text-sm font-normal text-black">
            {label}
            {!readOnly && <span className="ml-0.5 text-red-500">*</span>}
          </label>

          <div
            className={cn(
              'flex w-full min-w-0 max-w-full flex-col gap-3 rounded-[14px] border px-3 py-3',
              fieldState.error ? 'border-red-500' : 'border-gray-300',
            )}
          >
            <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row">
              {salaryTypeSelect(true)}
              {currencySelect(true)}
            </div>

            <div className="flex w-full min-w-0 flex-col gap-2">
              <p className="text-xs font-medium text-slate-500">Salary range</p>
              <SalaryRangeInput
                value={field.value}
                onChange={field.onChange}
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
          </div>

          {fieldState.error?.message && (
            <FormHelperText error sx={{ mx: 0, mt: '4px' }}>
              {fieldState.error.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};

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

  if (jobTypeName) {
    return (
      <Controller
        name={jobTypeName}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="w-full min-w-0 max-w-full sm:hidden">
              <label className="mb-2 block text-left text-sm font-normal text-black">{label}</label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="!h-[60px] !w-full min-w-0 max-w-full rounded-[14px] text-base text-black">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Onsite" className="text-black">
                    Onsite
                  </SelectItem>
                  <SelectItem value="Hybrid" className="text-black">
                    Hybrid
                  </SelectItem>
                  <SelectItem value="Remote" className="text-black">
                    Remote
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.error?.message && (
                <p className="mt-1 text-left text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </div>

            <Box sx={{ width: '100%' }} className="hidden sm:block">
              <TextField
                label={label}
                value=""
                autoComplete="off"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message || ''}
                slotProps={{ inputLabel: { shrink: true } }}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FormControl sx={{ minWidth: 140 }}>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[140px] text-black">
                            <SelectValue placeholder="Job Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Onsite" className="text-black">
                              Onsite
                            </SelectItem>
                            <SelectItem value="Hybrid" className="text-black">
                              Hybrid
                            </SelectItem>
                            <SelectItem value="Remote" className="text-black">
                              Remote
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '60px',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: 400,
                  },
                  '& .MuiInputLabel-root': {
                    color: 'gray',
                  },
                  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                    color: 'black',
                  },
                }}
              />
            </Box>
          </>
        )}
      />
    );
  }

  if (name === 'salary' && currencyName && salaryTypeName) {
    return (
      <SalaryField
        name={name}
        label={label}
        currencyName={currencyName}
        salaryTypeName={salaryTypeName}
        readOnly={readOnly}
        currencyValue={currencyValue}
        salaryTypeValue={salaryTypeValue}
        value={value}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || ''}
      render={({ field, fieldState }) => (
        <Box sx={{ width: '100%', minWidth: 0, maxWidth: '100%', position: 'relative' }}>
          <TextField
            {...field}
            autoFocus={isEditable}
            inputRef={inputRef}
            fullWidth
            label={label}
            placeholder={name === 'salary' ? undefined : placeholder}
            autoComplete="off"
            variant="outlined"
            type={name === 'salary' ? 'text' : actualType}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || ''}
            slotProps={{ inputLabel: { shrink: true } }}
            value={jobTypeName ? '' : (value || field.value || '')}
            onChange={field.onChange}
            InputProps={{
              readOnly,
              inputComponent: name === 'salary' ? (SalaryRangeInput as any) : undefined,
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
                              <SelectItem value="PKR" className="text-black">PKR</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      )}
                    />
                    <div
                      className="flex h-9 w-[100px] items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-[16px] font-normal text-black"
                      aria-label="Salary mode"
                    >
                      Range
                    </div>
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
