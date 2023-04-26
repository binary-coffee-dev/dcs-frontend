import { InjectionToken } from '@angular/core';

export interface Environment {
  apiUrl: string;
  graphqlUrl: string;
  podcastApiUrl: string;
  siteUrl: string;
  siteDashboardUrl: string;
  production: boolean;
  local?: boolean;
  githubClientId?: string;
  googleAnalyticsId?: string;
  postPageSize?: number;
  isDashboard?: boolean;
  socials?: {
    telegram: string;
    github: string;
    facebook: string;
    twitter: string;
  },
  contactMail: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
