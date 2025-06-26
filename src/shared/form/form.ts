import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Customer } from '../../model/customer.interface';
import { CustomerData } from '../../services/customer-data';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {
  @Output() customerAdded = new EventEmitter<Customer>();

  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private customerDataService: CustomerData) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      nik: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(16), Validators.maxLength(16), this.nikUniqueValidator.bind(this)]],
      age: [0, [Validators.required, Validators.min(17)]],
      job: ['']
    });
  }

  nikUniqueValidator(control: AbstractControl) {
    const nik = control.value;
    if (!nik) return null;
    return this.customerDataService.nikExists(nik) ? { nikTaken: true } : null;
  }
  
  addCustomer() {
    if (this.customerForm.valid) {
      this.customerAdded.emit(this.customerForm.value);
      this.customerForm.reset(); // reset form setelah submit
    } else {
      this.customerForm.markAllAsTouched(); // paksa semua field menunjukkan error
    }
  }
}
