import * as App from '@zaius/app-sdk';
import {logger} from '@zaius/app-sdk';

export class HandleRegion extends App.Function {
  public async perform(): Promise<App.Response> {
    logger.info(this.request.body);

    const lists = [{text: 'EMEA', value: 'EMEA'}, {text: 'EASTUS', value: 'EASTUS'}, {text: 'WESTUS', value: 'WESTUS'}];

    return new App.Response(200, lists);
  }
}
