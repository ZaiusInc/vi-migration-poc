import * as App from '@zaius/app-sdk';
import {KnownFieldSection} from '../data/FormSettings';

export class KnownFormController {
    private readonly incoming: KnownFieldSection;
    private readonly result: App.LifecycleSettingsResult;

    constructor(incoming: KnownFieldSection, result: App.LifecycleSettingsResult) {
        this.incoming = incoming;
        this.result = result;
    }

    public async save_known_field(): Promise<KnownFieldSection> {
        this.result.addToast('success', `Start migration.`);
        this.result.redirectToSettings('migration_progress');
        return {};
    }

    public async createCustomField(): Promise<KnownFieldSection> {
        this.result.addToast('success', `createCustomField.`);
        return {};
    }
}
