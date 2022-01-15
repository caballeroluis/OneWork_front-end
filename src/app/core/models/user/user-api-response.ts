import { User } from '@core/models';

export class UserApiResponse {
  _id!: string;
  user!: User[];
  ok!: boolean;
  err!: {
    message: string;
  }
}
