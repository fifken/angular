import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table } from '../shared/table/table';
import { CommonModule } from '@angular/common';
import { admin } from '../model/admin.interface';
import { Customer } from '../model/customer.interface';
import { Form } from '../shared/form/form';
import { CustomerData } from '../services/customer-data';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    // RouterOutlet,
    Table,
    Form
  ],
  providers: [CustomerData],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
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
  
  customers: Customer[] = [];

  constructor(private customerDataService: CustomerData){}

  ngOnInit(): void {
    this.customers = this.customerDataService.getData();
    this.uptTableParent = this.customers;
  }


  uptTableParent: Customer[] = this.customers; 

  onRemoveCustomer(index: number): void {
  this.customers = this.customerDataService.removeData(index);
  this.uptTableParent = [...this.customers]; // trigger update ke child
  }

  onAddCustomerFromChild(newCust: Customer): void {
    this.customers = this.customerDataService.addData(newCust);
    this.uptTableParent = [...this.customers]; // update agar terdeteksi perubahan
  }
}
