import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateStoreService } from '@core/services';
import { Offer, User } from '@shared/models';
import { OfferStoreService, UserStoreService } from '@shared/services';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss']
})
export class NewOfferComponent implements OnInit {
  
  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  public workerAssigned?: User;
  public workerAssignedId? = this.route.snapshot.paramMap.get('workerAssignedId');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private offerSS: OfferStoreService,
    private userSS: UserStoreService,
    public stateSS: StateStoreService
  ) { }

  ngOnInit(): void {
    if (this.stateSS.session?.token === '') {
      this.router.navigate(['session', 'login']);
    }

    if (!this.stateSS.users || this.stateSS.users.length === 0) {
      this.userSS.getUsers();
    }

    if (this.workerAssignedId) {
      this.workerAssigned = this.stateSS.users.find(
        user => user._id === this.workerAssignedId
      ) as User;
    }

    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        salary: [''],
        title: [''],
        requirements: [''],
        technicianChecked: [false],
        workplaceAddress: [''],
        videoCallLink: [''],
        offerLink: [''],
        videoCallDate: [new Date()], // TODO: probar https://www.htmlelements.com/docs/datetimepicker
        videoCallHour: [new Date().getHours() + ':' + new Date().getMinutes()],
        description: [''],
        worker: null
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    
    let offer: Offer = {
      ...this.reactiveForm.getRawValue()
    };

    let isoUTCOutputDateTime = new Date(this.reactiveForm.controls.videoCallDate.value)
    isoUTCOutputDateTime.setHours(this.reactiveForm.controls.videoCallHour.value.split(':')[0])
    isoUTCOutputDateTime.setMinutes(this.reactiveForm.controls.videoCallHour.value.split(':')[1])
    offer.videoCallDate = isoUTCOutputDateTime.toISOString();
    
    offer.recruiterAssigned = this.stateSS.session.user;

    if (this.workerAssignedId) {
      offer.workerAssigned = this.workerAssigned;
    } else {
      offer.workerAssigned = this.stateSS.users.find(
        user => user._id === this.reactiveForm.controls.worker.value._id
      )
    }
    
    if (this.reactiveForm.valid) {
      this.offerSS.newOffer(offer);
    } else {
      throw new Error('Form error');
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
