import { User } from '@shared/models';

export class Session {
  
  user: User = new User();
  token: string = '';
  refreshToken: string = '';

}
