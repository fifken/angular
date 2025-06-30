import { ComponentFixture, TestBed }      from '@angular/core/testing';
import { ReactiveFormsModule }            from '@angular/forms';
import { By }                             from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

import { Form }     from './form';        // form.ts
import { Customer } from '../../model/customer.interface';

describe('Form (standalone)', () => {
  let fixture: ComponentFixture<Form>;
  let component: Form;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:   [Form, ReactiveFormsModule],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture   = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit customerAdded with form value', () => {
    spyOn(component.customerAdded, 'emit');

    component.customerForm.setValue({
      nik:  '1234567890123456',
      name: 'Foo',
      age:   20,
      job:  'Bar'
    });
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.customerAdded.emit).toHaveBeenCalledWith({
      nik:  '1234567890123456',
      name: 'Foo',
      age:   20,
      job:  'Bar'
    } as Customer);
  });

  it('form should be invalid when empty', () => {
    expect(component.customerForm.valid).toBeFalse();
  });

  it('should reset all fields after successful submit', () => {
    // fill and submit
    component.customerForm.setValue({
      nik:  '1234567890123456',
      name: 'Foo',
      age:   20,
      job:  'Bar'
    });
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement.click();

    // after submit, form.reset() should clear values
    expect(component.customerForm.value).toEqual({
      nik:  '',
      name: '',
      age:  null,
      job:  ''
    });
  });

  it('should NOT emit customerAdded when form is invalid', () => {
    spyOn(component.customerAdded, 'emit');

    // make form invalid (empty nik)
    component.customerForm.setValue({
      nik:  '',
      name: 'Foo',
      age:   20,
      job:  'Bar'
    });
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.customerAdded.emit).not.toHaveBeenCalled();
  });
});
