import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import {ValidationService} from '../../../shared/services/validation.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';


const VALIDATION_MESSAGES: Record<string, (error: any, label: string) => string> = {
  required: (_error, label) => `${label} is required.`,
  minlength: (error, label) => `${label} must be at least ${error.requiredLength} characters.`,
  email: (_error, label) => `${label} must be a valid email address.`,
};

const FIELD_LABELS: Record<string, string> = {
  username: 'Username',
  password: 'Password',
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private readonly validationService = inject(ValidationService)
  private messageService = inject(MessageService)

  readonly fieldLabels = FIELD_LABELS
  readonly validationMessages = VALIDATION_MESSAGES

  isLoading = false;


  submitError = signal<string | null>(null)


  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  })

  get f() { return this.loginForm.controls; }

  getErrorMessage(controlName: keyof typeof this.f){
    return this.validationService.getErrorMessage(
      this.f[controlName],
      this.fieldLabels[controlName],
      this.validationMessages
      )
  }

  handleSubmit(){
    if(this.loginForm.invalid){
      this.validationService.markAllAsTouched(this.loginForm)
      this.messageService.add({
        severity: 'error',
        summary: 'Incomplete Form',
        detail: 'Please fill in all required fields correctly.',
        life: 3000,
      });
      return
    }
    this.isLoading = true;
    const payload = this.loginForm.getRawValue();
    setTimeout(() => {
      this.isLoading = false;

      const isCredentialsValid = payload.username === 'admin' && payload.password === 'password123';

      if (!isCredentialsValid) {
        this.submitError.set('Username or password is incorrect. Please try again.');
        return;
      }
      this.submitError.set(null)
      localStorage.setItem('username', payload.username)
      this.router.navigate(['/employees'])
    }, 1000);
  }
}
