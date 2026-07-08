export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: 'Active' | 'Inactive' | 'On Leave';
  group: string;
  description: string;
}
