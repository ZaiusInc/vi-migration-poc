import * as App from '@zaius/app-sdk';
import {logger, storage} from '@zaius/app-sdk';
import { CustomFormController } from './CustomFormController';
import { KnownFormController } from './KnownFormController';
import { AuthFormController } from './AuthFormController';
import { CustomSection, CUSTOM_SECTION, KNOWN_SECTION, KnownFieldSection, AuthSection, AUTH_SECTION, PoolUpdate} from '../data/FormSettings';

export class Lifecycle extends App.Lifecycle {
  public async onInstall(): Promise<App.LifecycleResult> {
    try {
      logger.info(`Performing Install`);
      // TODO: any operation you need to perform during installation
      return {success: true};
    } catch (error) {
      logger.error('Error during installation:', error);
      return {success: false, retryable: true};
    }
  }

  public async onSettingsForm(
    section: string, action: string, formData: App.SubmittedFormData
  ): Promise<App.LifecycleSettingsResult> {
    const result = new App.LifecycleSettingsResult();
    try {
      // TODO: any logic you need to perform when a setup form section is submitted
      // When you are finished, save the form data to the settings store
      switch (section) {
        case KNOWN_SECTION:
          const controller2 = new KnownFormController(formData, result);
          let sectionData2: KnownFieldSection = {};
          switch (action) {
            case 'save_known_field':
              sectionData2 = await controller2.save_known_field();
              formData.migrating = true;
              break;
            case 'create_custom_field':
              sectionData2 = await controller2.createCustomField();
              // const updateArray: PoolUpdate[] = [{
              //   ipPool: '10',
              //   ts: '10'
              // }, {
              //   ipPool: '11',
              //   ts: '11'
              // }, {
              //   ipPool: '12',
              //   ts: '12'
              // }, {
              //   ipPool: '13',
              //   ts: '13'
              // }];
              // formData.poolTable = key;
              break;
          }
          await storage.settings.put(section, formData);
          break;

        case AUTH_SECTION:
          const controller3 = new AuthFormController(formData, result);
          let sectionData3: AuthSection = {};
          switch (action) {
            case 'login':
              sectionData3 = await controller3.login();
              formData.authenticated = true;
              break;
            case 'logout':
              sectionData3 = await controller3.logout();
              formData.account = '';
              formData.secret = '';
              formData.authenticated = false;
              break;
          }
          await storage.settings.put(section, formData);
          break;

        default:
          result.addToast('danger', `Cannot save unhandled section: ${section}`);
          break;
      }
      return result;
    } catch (e) {
      return result.addToast('danger', 'Sorry, an unexpected error occurred. Please try again in a moment.');
    }
  }

  public async onAuthorizationRequest(
    section: string, formData: App.SubmittedFormData
  ): Promise<App.LifecycleSettingsResult> {
    const result = new App.LifecycleSettingsResult();
    // TODO: if your application supports the OAuth flow (via oauth_button in the settings form), evaluate the form
    // data and determine where to send the user: `result.redirect('https://<external oauth endpoint>')`
    return result.addToast('danger', 'Sorry, OAuth is not supported.');
  }

  public async onAuthorizationGrant(request: App.Request): Promise<App.AuthorizationGrantResult> {
    // TODO: if your application supports the OAuth flow, evaluate the inbound request and perform any necessary action
    // to retrieve the access token, then forward the user to the next relevant settings form section:
    // `new App.AuthorizationGrantResult('my_next_section')`
    return new App.AuthorizationGrantResult('').addToast('danger', 'Sorry, OAuth is not supported.');
  }

  public async onUpgrade(fromVersion: string): Promise<App.LifecycleResult> {
    // TODO: any logic required when upgrading from a previous version of the app
    // Note: `fromVersion` may not be the most recent version or could be a beta version
    return {success: true};
  }

  public async onFinalizeUpgrade(fromVersion: string): Promise<App.LifecycleResult> {
    // TODO: any logic required when finalizing an upgrade from a previous version
    // At this point, new webhook URLs have been created for any new functions in this version
    return {success: true};
  }

  public async onAfterUpgrade(): Promise<App.LifecycleResult> {
    // TODO: any logic required after the upgrade has been completed.  This is the plugin point
    // for triggering one-time jobs against the upgraded installation
    return {success: true};
  }

  public async canUninstall(): Promise<App.CanUninstallResult> {
    // TODO: any logic required to determine if an installation can be uninstalled.
    return {uninstallable: true};
  }

  public async onUninstall(): Promise<App.LifecycleResult> {
    // TODO: any logic required to properly uninstall the app
    return {success: true};
  }

  private buildPoolUpdatesTable(updates?: PoolUpdate[]): string | null {
    let table;
    if (updates) {
      table = ''.concat(
        '** Update History **\n\n',
        '|Pool|Updated At|\n',
        '|------|------|\n',
      );

      updates.forEach((update) => table += `|${update.ipPool}|${update.ts}\n`);
    }

    return table;
  }
}
