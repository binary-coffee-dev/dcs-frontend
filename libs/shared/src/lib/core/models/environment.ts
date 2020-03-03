import {InjectionToken} from '@angular/core';

export interface Environment {
  apiUrl: string;
  graphqlUrl: string;
  siteUrl: string;
  production: boolean;
  githubClientId?: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
