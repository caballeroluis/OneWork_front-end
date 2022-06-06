import { User } from '@shared/models';

export class Session {
  
  user: User;
  token: string;
  refreshToken: string;

  constructor() {
    this.user = new User();
    this.token = '';
    this.refreshToken = '';
  }
  
}
