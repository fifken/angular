import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table } from '../shared/table/table';
import { CommonModule } from '@angular/common';
import { admin } from '../model/admin.interface';
import { Customer } from '../model/customer.interface';
import { Form } from '../shared/form/form';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Table,
    Form
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected title = 'first-project';
  index: number = 1;

  admins: admin[] = [
    { username: 'admin1', isAdmin: true },
    { username: 'admin2', isAdmin: true },
    { username: 'admin3', isAdmin: false },
    { username: 'admin4', isAdmin: true },
    { username: 'admin5', isAdmin: false }
  ];

  isIdentified = false;

  identifyAdmin(): void {
    this.isIdentified = true;
  }

  isShowTable = false;

  showTable(): void {
    this.isShowTable = true;
  }

  isRestrict = false;

  restrictAdmin(): void {
    this.isRestrict = true;
  }

  customers: Customer[] = [
    { name: 'John Doe', age: 30, job: 'Developer' },
    { name: 'Jane Smith', age: 25, job: 'Designer' },
    { name: 'Alice Johnson', age: 28, job: 'Manager' },
    { name: 'Bob Brown', age: 35, job: 'Analyst' },
    { name: 'Charlie White', age: 40, job: 'Tester' }
  ];

  uptTableParent: Customer[] = this.customers; 

  removeCustomer(index: number): void {
  this.customers.splice(index, 1);
  this.uptTableParent = [...this.customers]; // trigger update ke child
  }

  addCustomerFromChild(newCust: Customer): void {
    this.customers.push(newCust);
    this.uptTableParent = [...this.customers]; // update agar terdeteksi perubahan
  }
}
