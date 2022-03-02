import { Component } from '@angular/core';
import { StateStoreService } from '@core/services';
import { OfferStoreService } from '@shared/services';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Offer } from '@shared/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(
    private offerSS: OfferStoreService,
    public stateSS: StateStoreService
  ) { }

  ngAfterViewInit() {
    if (!this.stateSS.offers || this.stateSS.offers.length === 0) {
      this.offerSS.getOffers();
    }
  }
  
  dropCard(event: CdkDragDrop<string[] | any>) {
    let offer = {
      ...event.previousContainer.data[event.previousIndex],
      status: event.container.id
    } as Offer;
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.offerSS.updateOffer(offer);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

  getOffers() {
    this.offerSS.getOffers();
  }

}
