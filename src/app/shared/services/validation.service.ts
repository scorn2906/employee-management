import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {ValidationMessages} from '../types/validation-message.types';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  getErrorMessage(
    control: AbstractControl | null,
    label: string,
    validationMessages: ValidationMessages
  ): string | null {

    if (!control?.touched || !control.errors) {
      return null;
    }

    const firstErrorKey = Object.keys(control.errors)[0];

    const builder = validationMessages[firstErrorKey];

    if (builder) {
      return builder(control.errors[firstErrorKey], label);
    }

    return `${label} is invalid.`;
  }

  hasError(control: AbstractControl | null): boolean {
    return !!control && control.invalid && control.touched;
  }

  isRequired(control: AbstractControl | null): boolean {
    if (!control?.validator) {
      return false;
    }

    const validator = control.validator({} as AbstractControl);

    return !!validator?.['required'];
  }

  markAllAsTouched(control: AbstractControl): void {
    control.markAllAsTouched();
  }
}
