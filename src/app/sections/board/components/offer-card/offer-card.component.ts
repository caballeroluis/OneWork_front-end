import { Component, OnInit, Input } from '@angular/core';
import { StateStoreService } from '@core/services';
import { Offer } from '@shared/models';

@Component({
  selector: 'board-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() offer!: Offer;

  constructor(
    public stateSS: StateStoreService
  ) { }

  ngOnInit(): void {
  }
  
}
