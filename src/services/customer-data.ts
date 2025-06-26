import { Injectable } from '@angular/core';
import { Customer } from '../model/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerData {

  dataUser: Customer[] =
    [
      { nik: '1111111111111111', name: 'John Doe', age: 30, job: 'Developer' },
      { nik: '2222222222222222', name: 'Jane Smith', age: 25, job: 'Designer' },
      { nik: '3333333333333333', name: 'Alice Johnson', age: 28, job: 'Manager' },
      { nik: '4444444444444444', name: 'Bob Brown', age: 35, job: 'Analyst' },
      { nik: '5555555555555555', name: 'Charlie White', age: 40, job: 'Tester' },
    ];

  constructor() {}


  getData(): Customer[] {
    return this.dataUser;
  }

  addData(newCust: { nik: string; name: string; age: number; job?: string }) {
    this.dataUser.push(newCust);
    return this.dataUser;
  }

  removeData(index: number){
    this.dataUser.splice(index, 1);
    return this.dataUser;
  }

  nikExists(nik: string): boolean {
    return this.dataUser.some(cust => cust.nik === nik);
  }

}
