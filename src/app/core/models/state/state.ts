import { User } from '@shared/models';
import { Session } from '@sections/session/models';
export class State {
  session!: Session;
  user!: User[];
}
