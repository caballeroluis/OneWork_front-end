import { User } from '@core/models';

export class Session {
  user!: User;
  token!: string;
}
