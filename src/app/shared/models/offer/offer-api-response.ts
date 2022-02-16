import { User } from '@shared/models';

export class OfferApiResponse {
  
  creationDate?: Date;
  salary?: number;
  title?: string;
  requirements?: string;
  workplaceAddress?: string;
  description?: string;
  status?: string;
  recruiter?: User;
  worker?: User;
  
}
