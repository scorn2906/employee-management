import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';


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
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder)
  private router = inject(Router)

  isLoading = false;


  submitError = signal<string | null>(null)


  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  })

  get f() { return this.loginForm.controls; }

  getErrorMessage(controlName: keyof typeof this.f): string | null {
    const control = this.f[controlName];
    if (!control.errors || !control.touched) return null;

    const label = FIELD_LABELS[controlName] ?? controlName;
    const firstErrorKey = Object.keys(control.errors)[0];
    const messageBuilder = VALIDATION_MESSAGES[firstErrorKey];

    return messageBuilder
      ? messageBuilder(control.errors[firstErrorKey], label)
      : `${label} is invalid.`;
  }

  handleSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      return;
    }
    this.isLoading = true;
    const payload = this.loginForm.getRawValue();
    console.log(payload);
    setTimeout(() => {
      this.isLoading = false;

      const isCredentialsValid = payload.username === 'admin' && payload.password === 'password123';

      if (!isCredentialsValid) {
        this.submitError.set('Username or password is incorrect. Please try again.');
        return;
      }
      this.submitError.set(null)
      localStorage.setItem('username', payload.username)
      this.router.navigate(['/'])
    }, 1000);
  }
}
