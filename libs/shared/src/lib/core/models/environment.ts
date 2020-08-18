import { InjectionToken } from '@angular/core';

export interface Environment {
  apiUrl: string;
  graphqlUrl: string;
  podcastApiUrl: string;
  siteUrl: string;
  siteDashboardUrl?: string;
  production: boolean;
  local?: boolean;
  githubClientId?: string;
  googleAnalyticsId?: string;
  postPageSize?: number;
  isDashboard?: boolean;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
