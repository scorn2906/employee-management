import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';
import {EmployeeListStateService} from '../service/employee-list-state.service';
import {TooltipModule} from 'primeng/tooltip';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {SearchField} from '../../../shared/components/field/search-field/search-field';
import {STATUS_OPTIONS, STATUS_SEVERITY} from '../data/employee.data';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TagModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule,
    IconFieldModule,
    InputIconModule,
    SearchField
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './employee-list.html',
})
export class EmployeeList {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  state = inject(EmployeeListStateService)

  private allEmployees = signal<Employee[]>(this.employeeService.getAll());

  statusOptions = [
    { label: 'All Status', value: null }, ...STATUS_OPTIONS];
  rowsPerPageOptions = [10, 25, 50, 100];


  filteredEmployees = computed(() => {
    const name = this.state.nameFilter().trim().toLowerCase();
    const status = this.state.statusFilter();

    return this.allEmployees().filter((employee) => {
      const matchesName =
        !name ||
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(name) ||
        employee.username.toLowerCase().includes(name);

      const matchesStatus = !status || employee.status === status;

      return matchesName && matchesStatus;
    });
  });

  goToAddEmployee(): void {
    this.router.navigate(['/employees/create']);
  }

  goToDetail(employee: Employee): void {
    this.router.navigate(['/employees', employee.id]);
  }

  getStatusSeverity(status: Employee['status']): 'success' | 'danger' | 'warn' {
    return STATUS_SEVERITY[status];
  }

  onEdit(employee: Employee): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Edit Employee',
      detail: `Editing ${employee.firstName} ${employee.lastName} (dummy action).`,
      life: 3000,
    });
  }

  onDelete(employee: Employee): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', outlined: true, label: 'Cancel' },
      accept: () => {
        this.employeeService.deleteById(employee.id);
        this.allEmployees.set(this.employeeService.getAll());

        this.messageService.add({
          severity: 'error',
          summary: 'Employee Deleted',
          detail: `${employee.firstName} ${employee.lastName} has been deleted (dummy action).`,
          life: 3000,
        });
      },
    });
  }
}
