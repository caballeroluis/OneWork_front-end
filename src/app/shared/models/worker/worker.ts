import { Offer } from '@shared/models'; // TODO: borrar este modelo innecesario?

export class Worker {
    corporationName?: string;
    descriptionCorporate?: string;
    international?: boolean;
    recruiterName?: string;
    recruiterSurname1?: string;
    recruiterSurname2?: string;
    contactData?: string;
    offersCreated?: Offer[];
}
