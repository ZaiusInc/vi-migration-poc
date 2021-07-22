/**
 * TODO: Create interfaces that represents the data you expect to receive
 */
export interface IncomingEvent {
  type: string;
  action: string;
  customer?: IncomingCustomer;
}

export interface IncomingCustomer {
  email: string;
  firstName: string;
  lastName: string;
  points: number;
}
