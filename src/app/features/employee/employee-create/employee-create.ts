import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {DatePickerModule} from 'primeng/datepicker';
import {SelectModule} from 'primeng/select';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {EmployeeService, GROUP_OPTIONS} from '../service/employee.service';
import {Employee} from '../model/employee.model';
import {ValidationService} from '../../../shared/services/validation.service';
import {ValidationMessages} from '../../../shared/types/validation-message.types';

const VALIDATION_MESSAGES: ValidationMessages = {
  required: (_error, label) => `${label} is required.`,
  email: (_error, label) => `${label} must be a valid email address.`,
  futureDate: (_error, label) => `${label} cannot be later than today.`,
  min: (error, label) =>
    `${label} must be greater than or equal to ${error.min}.`,
};

const FIELD_LABELS: Record<string, string> = {
  username: 'Username',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  birthDate: 'Birth date',
  basicSalary: 'Basic salary',
  status: 'Status',
  group: 'Group',
  description: 'Description',
};

function noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return selectedDate > today ? { futureDate: true } : null;
}


@Component({
  selector: 'app-employee-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.css',
})
export class EmployeeCreate {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private messageService = inject(MessageService)
  protected readonly validationService = inject(ValidationService)

  readonly fieldLabels = FIELD_LABELS;
  readonly validationMessages = VALIDATION_MESSAGES;

  today = new Date();

  groupOptions = GROUP_OPTIONS.map((group) => ({ label: group, value: group }));
  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'On Leave', value: 'On Leave' },
  ];
  employeeForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: this.fb.control<Date | null>(null, [Validators.required, noFutureDateValidator]),
    basicSalary: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    status: ['', [Validators.required]],
    group: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  get f() {
    return this.employeeForm.controls;
  }

  getErrorMessage(controlName: keyof typeof this.f) {
    return this.validationService.getErrorMessage(
      this.f[controlName],
      this.fieldLabels[controlName],
      this.validationMessages
    );
  }

  handleSave(): void {
    if (this.employeeForm.invalid) {
      this.validationService.markAllAsTouched(this.employeeForm)
      this.messageService.add({
        severity: 'error',
        summary: 'Incomplete Form',
        detail: 'Please fill in all required fields correctly.',
        life: 3000,
      });
      return;
    }
    const payload = this.employeeForm.getRawValue() as Omit<Employee, 'id'>;
    this.employeeService.add(payload);

    this.messageService.add({
      severity: 'success',
      summary: 'Employee Added',
      detail: `${payload.firstName} ${payload.lastName} has been added successfully.`,
      life: 2000,
    });
    setTimeout(() => this.router.navigate(['/employees']), 800);
  }

  handleCancel(): void {
    this.router.navigate(['/employees']);
  }
}
