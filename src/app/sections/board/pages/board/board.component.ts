import { Component, OnInit } from '@angular/core';
import { StateStoreService } from '@core/services';
import { OfferStoreService } from '@shared/services';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Offer } from '@shared/models';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private offersSubscription!: Subscription;

  public backlogList$!: Observable<Offer[]>;
  public readyList$!: Observable<Offer[]>;
  public inProgressList$!: Observable<Offer[]>;
  public videoSetList$!: Observable<Offer[]>;
  public technicianCheckedList$!: Observable<Offer[]>;
  public acceptedList$!: Observable<Offer[]>;

  constructor(
    private offerSS: OfferStoreService,
    public stateSS: StateStoreService
  ) { }

  ngOnInit() {
    this.initializeLists();
    
    if (!this.stateSS.offers || this.stateSS.offers.length === 0) {
      this.offerSS.getOffers();
    }
  }

  initializeLists() {
    this.offersSubscription = this.stateSS.offers$.subscribe(offers => {
      this.backlogList$ = of([...offers]).pipe(
        map(offers => offers.filter(offer => offer.status === 'backlog'))
      ).pipe(
        map(offers => offers.sort(this.sortBySalary))
      );
      this.readyList$ = of([...offers]).pipe(
        map(offers => offers.filter(offer => offer.status === 'ready'))
      ).pipe(
        map(offers => offers.sort(this.sortBySalary))
      );
      this.inProgressList$ = of([...offers]).pipe(
        map(offers => offers.filter(offer => offer.status === 'inProgress'))
      ).pipe(
        map(offers => offers.sort(this.sortBySalary))
      );
      this.videoSetList$ = of([...offers]).pipe(
        map(offers => offers.filter(offer => offer.status === 'videoSet'))
      ).pipe(
        map(offers => offers.sort(this.sortBySalary))
      );
      this.technicianCheckedList$ = of([...offers]).pipe(
        map(offers => offers.filter(offer => offer.status === 'technicianChecked'))
      ).pipe(
        map(offers => offers.sort(this.sortBySalary))
      );
      this.acceptedList$ = of([...offers]).pipe(
        map(offers => offers.filter(offer => offer.status === 'accepted'))
      ).pipe(
        map(offers => offers.sort(this.sortBySalary))
      );
    });
  }
  
  dropCard(event: CdkDragDrop<string[] | any>) {
    const offer = {
      ...event.previousContainer.data[event.previousIndex],
      status: event.container.id
    } as Offer;
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      this.offerSS.editOffer(offer);
    }
  }

  getOffers() {
    this.offerSS.getOffers();
  }

  deleteOffer(offer: Offer) {
    this.offerSS.deleteOffer(offer);
  }

  ngOnDestroy() {
    this.offersSubscription.unsubscribe();

    this.backlogList$.subscribe();
    this.readyList$.subscribe();
    this.inProgressList$.subscribe();
    this.videoSetList$.subscribe();
    this.technicianCheckedList$.subscribe();
    this.acceptedList$.subscribe();
  }

  sortBySalary(a: any, b: any) {
    if (a.salary > b.salary)
      return -1;
    if (a.salary < b.salary)
      return 1;
    return 0;
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
