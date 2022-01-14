import { Component, OnInit } from '@angular/core';
import { SessionStorageService, UserStorageService } from '@core/services';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(
    public userStoreService: UserStorageService,
    public sessionStoreService: SessionStorageService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.sessionStoreService.session! && this.userStoreService.user?.length === 0) {
      this.userStoreService.apiUser();
    }
  }

  getIdTrackFn = (i: number, item: any) => item.id;

}
