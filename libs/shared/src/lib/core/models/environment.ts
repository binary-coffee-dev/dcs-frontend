import {InjectionToken} from '@angular/core';

export interface Environment {
  apiUrl: string;
  graphqlUrl: string;
  siteUrl: string;
  production: boolean;
  githubClientId?: string;
  googleAnalyticsId?: string;
  postPageSize?: number;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
