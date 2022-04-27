export class UserInterface {

  smallScreen: boolean;
  showLoader: boolean;
  coreSidenavClosed: boolean;

  constructor() {
    this.smallScreen = window.innerWidth < 480;
    this.showLoader = false;
    this.coreSidenavClosed = this.smallScreen;
  }

}
