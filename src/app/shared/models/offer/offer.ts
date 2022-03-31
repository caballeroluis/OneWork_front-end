import { User } from '@shared/models';

export class Offer {
  
  _id!: string;
  creationDate?: Date;
  salary?: number;
  title?: string;
  requirements?: string;
  abandoned?: boolean;
  workplaceAddress?: string;
  videoCallLink?: string;
  description?: string;
  status?: string;
  recruiterAssigned?: User;
  recruiterAssignedId?: string;
  workerAssigned?: User;
  workerAssignedId?: string;// TODO: hacer cuando cambie la api

  constructor() {
  }

}
