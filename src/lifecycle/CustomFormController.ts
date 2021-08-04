import * as App from '@zaius/app-sdk';
import {CustomSection} from '../data/FormSettings';

export class CustomFormController {
    private readonly incoming: CustomSection;
    private readonly result: App.LifecycleSettingsResult;

    constructor(incoming: CustomSection, result: App.LifecycleSettingsResult) {
        this.incoming = incoming;
        this.result = result;
    }

    public async createCustomField(): Promise<CustomSection> {
        this.result.addToast('success', `createCustomField.`);
        return {};
    }

    public async FormSettingsField(): Promise<CustomSection> {
        this.result.addToast('success', 'FormSettingsField.');
        return {};
    }
}
