import 'jest';
import {transformToCustomer} from './transformToCustomer';

const mockIncomingCustomer = {
  email: 'foo@bar.com',
  firstName: 'Foo',
  lastName: 'Bar',
  points: 42
};

describe('transformToCustomer', () => {
  it('transforms an incoming customer into a Zaius customer', () => {
    expect(transformToCustomer(mockIncomingCustomer)).toEqual({
      identifiers: {
        email: 'foo@bar.com',
      },
      attributes: {
        first_name: 'Foo',
        last_name: 'Bar',
        vi_migration_poc_example_points: 42
      }
    });
  });
});
