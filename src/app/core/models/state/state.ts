import { Offer, User } from '@shared/models';
import { Session } from '@sections/session/models';
export class State {

  session: Session;
  users: User[];
  offers: Offer[];

  constructor() {
    this.session = new Session();
    this.users = [];
    this.offers = [];
  }
  
}