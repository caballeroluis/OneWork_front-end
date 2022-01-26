import { User } from '@shared/models';

export class UserApiResponse {
  _id!: string;
  users!: User[];
  ok!: boolean;
  err!: {
    message: string;
  }
}
