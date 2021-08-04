import {ValueHash} from '@zaius/app-sdk';

export const AUTH_SECTION = 'auth';
export interface AuthSection extends ValueHash {
    // form properties
    authenticated?: boolean;

    // form elements
    account?: string;
    secret?: string;
}

export const CUSTOM_SECTION = 'custom_fields';
export interface CustomSection extends ValueHash {
    // form elements
    custom_field?: string;
    vi_field?: string;
}

export const KNOWN_SECTION = 'known_fields';
export interface KnownFieldSection extends ValueHash {
    // form properties
    migrating?: boolean;
    poolTable?: string;

    // form elements
    ad_engagement?: string;
}

export interface PoolUpdate extends ValueHash {
    ipPool: string;
    ts: string;
}
