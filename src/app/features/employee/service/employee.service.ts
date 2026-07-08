import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';

const FIRST_NAMES = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'James', 'Anna'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Moore'];
const STATUSES: Employee['status'][] = ['Active', 'Inactive', 'On Leave'];
const GROUPS = ['Engineering', 'Marketing', 'Sales', 'Finance', 'Human Resources', 'Operations'];

export const GROUP_OPTIONS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Finance',
  'Human Resources',
  'Operations',
  'Customer Support',
  'Product Management',
  'Legal',
  'Research & Development',
];

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = this.generateDummyData(100);
  private nextId = this.employees.length + 1;

  private generateDummyData(count: number): Employee[] {
    return Array.from({ length: count }, (_, index) => {
      const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
      const lastName = LAST_NAMES[(index + 3) % LAST_NAMES.length];
      const status = STATUSES[index % STATUSES.length];
      const group = GROUPS[index % GROUPS.length];

      return {
        id: index + 1,
        username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}`,
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@company.com`,
        birthDate: new Date(1970 + (index % 35), index % 12, (index % 28) + 1),
        basicSalary: 5000000 + (index % 20) * 500000,
        status,
        group,
        description: `Employee record #${index + 1} in ${group} department.`,
      };
    });
  }

  getAll(): Employee[] {
    return this.employees;
  }

  getById(id: number): Employee | undefined {
    return this.employees.find((emp) => emp.id === id);
  }

  add(employee: Omit<Employee, 'id'>): Employee {
    const newEmployee: Employee = { ...employee, id: this.nextId++ };
    this.employees = [newEmployee, ...this.employees];
    return newEmployee;
  }

  deleteById(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
  }
}
