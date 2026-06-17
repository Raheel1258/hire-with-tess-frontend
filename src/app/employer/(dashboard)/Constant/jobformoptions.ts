export const JOB_TYPE_OPTIONS = [
  { value: 'Onsite', label: 'Onsite' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'Remote', label: 'Remote' },
] as const;

export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
  { value: 'PKR', label: 'PKR' },
  { value: 'EUR', label: 'EUR' },
] as const;

export const SALARY_TYPE_OPTIONS = [
  { value: 'per_hour', label: 'Per Hour' },
  { value: 'per_month', label: 'Per Month' },
  { value: 'per_year', label: 'Per Year' },
] as const;

export function formatSalaryType(value?: string) {
  return SALARY_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
