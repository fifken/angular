import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer } from '../../model/customer.interface';
import { App } from '../../app/app';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() uptTableChild: Customer[] = [];
}
