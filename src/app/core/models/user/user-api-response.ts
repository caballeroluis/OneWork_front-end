import { User } from '@core/models';

export class UserApiResponse {
  user!: User[];
  ok!: boolean;
  err!: {
    message: string;
  }
}
