import {Component, computed, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/employee.model';
import {CurrencyFormatPipe} from '../../../shared/pipe/formated-currency.pipe';
import {IndonesiaDatePipe} from '../../../shared/pipe/formated-date.pipe';

const STATUS_SEVERITY: Record<Employee['status'], 'success' | 'danger' | 'warn'> = {
  Active: 'success',
  Inactive: 'danger',
  'On Leave': 'warn',
};

@Component({
  selector: 'app-employee-detail',
  imports: [
    CommonModule,
    ButtonModule,
    TagModule,
    CurrencyFormatPipe,
    IndonesiaDatePipe
  ],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private employeeService = inject(EmployeeService)

  private employeeId = Number(this.route.snapshot.paramMap.get('id'));

  employee = signal<Employee | undefined>(this.employeeService.getById(this.employeeId))

  statusSeverity = computed(() => {
    const status = this.employee()?.status;
    return status ? STATUS_SEVERITY[status] : 'secondary'
  })


  handleBack(): void {
    this.router.navigate(['/employees'])
  }


}
