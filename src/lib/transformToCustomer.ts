import { Zaius } from '@zaius/node-sdk';
import { IncomingCustomer } from '../data/IncomingEvents';

/**
 * Example transformer to convert an incoming payload into a Zaius customer
 * @param customer incoming representation of a customer
 */
export function transformToCustomer(customer: IncomingCustomer): Zaius.CustomerPayload {
  return {
    identifiers: {
      email: customer.email,
    },
    attributes: {
      first_name: customer.firstName,
      last_name: customer.lastName,
      vi_migration_poc_example_points: customer.points
    }
  };
}
