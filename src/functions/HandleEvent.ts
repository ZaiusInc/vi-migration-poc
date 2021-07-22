import * as App from '@zaius/app-sdk';
import {logger} from '@zaius/app-sdk';
import {z} from '@zaius/node-sdk';
import {IncomingEvent} from '../data/IncomingEvents';
import {transformToCustomer} from '../lib/transformToCustomer';

/**
 * Example event handler.
 * Expects a request in the form:
 *  url: https://[webhook-url]/?email=<email>
 * with a JSON body.
 * Fires a Zaius event and updates the customer's name in Zaius
 */
export class HandleEvent extends App.Function {
  /**
   * Handle a request to the handle_event function URL
   * this.request contains the request information
   * @returns App.Response as the HTTP response
   */
  public async perform(): Promise<App.Response> {
    const email = this.request.params['email'] as string;
    if (!email) {
      return new App.Response(400, 'Missing required email parameter');
    } else {
      try {
        const event = this.request.bodyJSON as IncomingEvent;

        // TODO: transform your event data into zaius API calls
        if (event.customer) {
          await z.customer(transformToCustomer(event.customer));
        }
        await z.event({
          type: event.type,
          action: event.action,
          identifiers: {
            email
          },
          data: {}
        });

        // return the appropriate status/response
        return new App.Response(200);
      } catch (e) {
        logger.error(e);
        return new App.Response(500, `An unexpected error occurred: ${e}`);
      }
    }
  }
}
