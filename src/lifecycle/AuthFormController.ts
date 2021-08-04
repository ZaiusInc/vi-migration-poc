import * as App from '@zaius/app-sdk';
import { storage } from '@zaius/app-sdk';
import {AuthSection, AUTH_SECTION} from '../data/FormSettings';

export class AuthFormController {
    private readonly incoming: AuthSection;
    private readonly result: App.LifecycleSettingsResult;

    constructor(incoming: AuthSection, result: App.LifecycleSettingsResult) {
        this.incoming = incoming;
        this.result = result;
    }

    public async login(): Promise<AuthSection> {
        if (this.incoming.account && this.incoming.secret) {
            // await storage.settings.put('auth', { authenticated: true });
            this.result.addToast('success', `login success.`);
            this.result.redirectToSettings('toggle_custom_schema');
        } else {
            // await storage.settings.put('auth', { authenticated: false });
            this.result.addToast('danger', 'login failed.');
        }
        return {};
    }

    public async logout(): Promise<AuthSection> {
        this.result.addToast('success', 'logout success.');
        return {};
    }
}
