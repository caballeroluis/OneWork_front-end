import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '@core/services';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(
    public userStoreService: UserStorageService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.userStoreService.user?.length === 0) {
      this.userStoreService.apiUser();
    }
  }

  getIdTrackFn = (i: number, item: any) => item.id;

}
