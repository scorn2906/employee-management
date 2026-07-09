import {Employee} from '../model/employee.model';

export const STATUS_OPTIONS = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
  { label: 'On Leave', value: 'On Leave' },
];

export const STATUS_SEVERITY: Record<Employee['status'], 'success' | 'danger' | 'warn'> = {
  Active: 'success',
  Inactive: 'danger',
  'On Leave': 'warn',
};
