import { User } from '@core/models';

export class SessionApiResponse {
  ok!: boolean;
  user!: User;
  token!: string;
  role!: string;
  err!: {
    message: string;
  }
}