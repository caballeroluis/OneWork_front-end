import { Offer } from '@shared/models';
export class User {

  _id!: string;
  email!: string;
  name?: string;
  corporationName?: string;
  active?: string;
  role?: string;
  creationDate?: string;
  password?: string;
  offers?: Offer[];

  constructor() {
    this.offers = [];
  }

}
