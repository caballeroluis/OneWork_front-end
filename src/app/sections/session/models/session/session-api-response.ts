import { User } from '@shared/models';

export class SessionApiResponse {
  ok!: boolean;
  user!: User;
  token!: string;
  err!: {
    message: string;
  }
}