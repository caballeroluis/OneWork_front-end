import { User } from '@core/models';

export class SessionApiResponse {
  ok!: boolean;
  user!: User;
  token!: string;
  err!: {
    message: string;
  }
}