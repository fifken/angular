import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../model/customer.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {
  newCustomer: Customer = { name: '', age: 0, job: '' };

  @Output() customerAdded = new EventEmitter<any>();

  addCustomer() {
    if (this.newCustomer.name && this.newCustomer.age) {
      this.customerAdded.emit(this.newCustomer);
      this.newCustomer = { name: '', age: 0, job: '' }; // reset form
    }
  }
}
