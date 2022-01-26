import { Offer } from '@shared/models';
export class User {

  _id!: string;
  email!: string;
  name?: string;
  corporationName?: string;
  state?: string;
  _type?: string;
  creationDate?: string;
  password?: string;
  offers: Offer[];

  constructor() {
    this.offers = [];
  }

}
