import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestBed, ComponentFixture }               from '@angular/core/testing';
import { provideZonelessChangeDetection }          from '@angular/core';

import { App }              from './app';               // app.ts
import { CustomerData }     from '../services/customer-data';
import { Customer }         from '../model/customer.interface';

// Stub FormComponent (standalone)
@Component({
  standalone: true,
  selector: 'app-form',
  template: ''
})
class StubForm {
  @Output() customerAdded = new EventEmitter<Customer>();
}

// Stub TableComponent (standalone)
@Component({
  standalone: true,
  selector: 'app-table',
  template: ''
})
class StubTable {
  @Input()  uptTableChild!: Customer[];
  @Output() deleteCustomer = new EventEmitter<number>();
}

describe('App (standalone)', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let service: CustomerData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        StubForm,
        StubTable
      ],
      providers: [
        CustomerData,
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture   = TestBed.createComponent(App);
    component = fixture.componentInstance;
    service   = TestBed.inject(CustomerData);
    // reset service state
    (service as any).dataUser = [];
  });

  it('should load data on init', () => {
    const initial: Customer[] = [
      { nik:'A', name:'Alpha', age:10, job:'X' },
      { nik:'B', name:'Beta',  age:20, job:'Y' }
    ];
    (service as any).dataUser = [...initial];

    component.ngOnInit();

    expect(component.uptTableParent).toEqual(initial);
    expect(component.uptTableParent.length).toBe(2);
  });

  it('loadData() should always overwrite uptTableParent', () => {
    const arr = [
      { nik:'X1', name:'X-one', age:11, job:'J1' },
      { nik:'X2', name:'X-two', age:22, job:'J2' }
    ];
    (service as any).dataUser = [...arr];
    // call private loadData via any-cast
    ;(component as any).loadData();
    expect(component.uptTableParent).toEqual(arr);
  });

  it('loadData() with empty service.data yields empty uptTableParent', () => {
    (service as any).dataUser = [];
    ;(component as any).loadData();
    expect(component.uptTableParent).toEqual([]);
    expect(component.uptTableParent.length).toBe(0);
  });

  it('onAddCustomerFromChild() adds new customer', () => {
    const initial: Customer[] = [
      { nik:'A', name:'Alpha', age:10, job:'X' }
    ];
    (service as any).dataUser      = [...initial];
    component.uptTableParent       = [...initial];

    const newC: Customer = { nik:'C', name:'Gamma', age:30, job:'Z' };
    component.onAddCustomerFromChild(newC);

    expect(service.getData().length).toBe(2);
    expect(component.uptTableParent.length).toBe(2);
    expect(component.uptTableParent[1]).toEqual(newC);
  });

  it('onRemoveCustomer() removes customer', () => {
    const initial: Customer[] = [
      { nik:'A', name:'Alpha', age:10, job:'X' },
      { nik:'B', name:'Beta',  age:20, job:'Y' }
    ];
    (service as any).dataUser      = [...initial];
    component.uptTableParent       = [...initial];

    component.onRemoveCustomer(0);

    expect(service.getData().length).toBe(1);
    expect(component.uptTableParent.length).toBe(1);
    expect(component.uptTableParent[0]).toEqual(initial[1]);
  });

  it('identifyAdmin() toggles isIdentified flag', () => {
    expect(component.isIdentified).toBeFalse();
    component.identifyAdmin();
    expect(component.isIdentified).toBeTrue();
    component.identifyAdmin();
    expect(component.isIdentified).toBeFalse();
  });

  it('showTable() toggles isShowTable flag', () => {
    expect(component.isShowTable).toBeFalse();
    component.showTable();
    expect(component.isShowTable).toBeTrue();
    component.showTable();
    expect(component.isShowTable).toBeFalse();
  });

  it('restrictAdmin() toggles isRestrict flag', () => {
    expect(component.isRestrict).toBeFalse();
    component.restrictAdmin();
    expect(component.isRestrict).toBeTrue();
    component.restrictAdmin();
    expect(component.isRestrict).toBeFalse();
  });
});
