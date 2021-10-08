export interface Subscription {
  token: string;
  email: string;
  enable: boolean;
  verified: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
