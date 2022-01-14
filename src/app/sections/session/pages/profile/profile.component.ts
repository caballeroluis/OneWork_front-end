import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '@core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
  }

}
