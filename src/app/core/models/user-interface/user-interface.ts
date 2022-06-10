import { environment } from '@env/environment';
import { Offer, User } from '@shared/models';

export class UserInterface {

  smallScreen?: boolean;
  showLoader?: boolean;
  coreSidenavClosed?: boolean;
  showDevTools?: boolean;
  userSelected?: User;
  offerSelected?: Offer;

  constructor() {
    this.smallScreen = window.innerWidth < 480;
    this.showLoader = false;
    this.coreSidenavClosed = this.smallScreen;
    this.showDevTools = environment.showDevTools;
  }

}
