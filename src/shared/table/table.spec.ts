import { ComponentFixture, TestBed }      from '@angular/core/testing';
import { By }                             from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

import { Table }    from './table';        // table.ts
import { Customer } from '../../model/customer.interface';

describe('Table (standalone)', () => {
  let fixture: ComponentFixture<Table>;
  let component: Table;
  const data: Customer[] = [
    { nik:'1111', name:'A', age:30, job:'Dev' },
    { nik:'2222', name:'B', age:25, job:'QA' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:   [Table],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture   = TestBed.createComponent(Table);
    component = fixture.componentInstance;
    component.uptTableChild = data;
    fixture.detectChanges();
  });

  it('should render one row per customer with correct columns', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);

    const cells = rows[0].queryAll(By.css('td'));
    // kolom: 0=nomor (index+1), 1=name, 2=age, 3=job
    expect(cells[0].nativeElement.textContent.trim()).toBe('1');
    expect(cells[1].nativeElement.textContent).toContain(data[0].name);
    expect(cells[2].nativeElement.textContent).toContain(data[0].age.toString());
    expect(cells[3].nativeElement.textContent).toContain(data[0].job);
  });

  it('should emit deleteCustomer(index) on button click', () => {
    spyOn(component.deleteCustomer, 'emit');
    fixture.debugElement.query(By.css('tbody tr button')).nativeElement.click();
    expect(component.deleteCustomer.emit).toHaveBeenCalledWith(0);
  });
});
