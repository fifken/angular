import { CustomerData } from './customer-data';
import { Customer }     from '../model/customer.interface';

describe('CustomerData Service', () => {
  let service: CustomerData;
  const sample: Customer = {
    nik:  '1111111111111111',
    name: 'Test User',
    age:   50,
    job:  'Developer'
  };

  beforeEach(() => {
    // plain instantiation, no Angular DI → no Zone.js needed
    service = new CustomerData();
    (service as any).dataUser = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getData() should return current array', () => {
    (service as any).dataUser = [sample];
    expect(service.getData()).toEqual([sample]);
  });

  it('addData() should push new Customer and return updated array', () => {
    const before = service.getData().length;
    const result = service.addData(sample);
    expect(result.length).toBe(before + 1);
    expect(result[result.length - 1]).toEqual(sample);
  });

  it('removeData() should remove at given index and return updated array', () => {
    const other = { ...sample, nik: '2222222222222222' };
    (service as any).dataUser = [sample, other];
    const result = service.removeData(1);
    expect(result).toEqual([sample]);
  });

  it('nikExists() should detect existing nik', () => {
    (service as any).dataUser = [sample];
    expect(service.nikExists(sample.nik)).toBeTrue();
    expect(service.nikExists('nope')).toBeFalse();
  });
});
