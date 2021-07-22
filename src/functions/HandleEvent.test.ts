import {z} from '@zaius/node-sdk';
import 'jest';
import {HandleEvent} from './HandleEvent';

jest.mock('@zaius/node-sdk');

const mockRequest = {
  params: {
    email: 'foo@bar.com'
  },
  bodyJSON: {
    type: 'example',
    action: 'completed',
    customer: {
      email: 'foo@bar.com',
      firstName: 'Foo',
      lastName: 'Bar'
    }
  }
};

describe('HandleEvent', () => {
  it('generates a customer update', async () => {
    const handler = new HandleEvent(mockRequest as any);
    await handler.perform();
    expect(z.customer).toHaveBeenCalledWith({
      identifiers: {
        email: 'foo@bar.com',
      },
      attributes: {
        first_name: 'Foo',
        last_name: 'Bar'
      }
    });
  });

  it('generates an event', async () => {
    const handler = new HandleEvent(mockRequest as any);
    await handler.perform();
    expect(z.event).toHaveBeenCalledWith({
      type: 'example',
      action: 'completed',
      identifiers: {
        email: 'foo@bar.com',
      },
      data: {}
    });
  });
});
