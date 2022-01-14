import { Offer } from '@core/models';

export class Recruiter {
    corporationName?: string;
    descriptionCorporate?: string;
    international?: boolean;
    recruiterName?: string;
    recruiterSurname1?: string;
    recruiterSurname2?: string;
    contactData?: string;
    offersCreated?: Offer[];
}
