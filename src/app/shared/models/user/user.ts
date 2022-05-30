import { Offer } from '@shared/models';
export class User {

  _id!: string;
  email!: string;
  name?: string;
  surname1?: string;
  surname2?: string;
  corporationName?: string;
  descriptionCorporate?: string;
  international?: boolean;
  recruiterName?: string;
  recruiterSurname1?: string;
  recruiterSurname2?: string;
  active?: string;
  role?: string;
  contactData?: string;
  creationDate?: string;
  password?: string;
  offers?: Offer[];

  constructor() {
    this.offers = [];
  }

}
