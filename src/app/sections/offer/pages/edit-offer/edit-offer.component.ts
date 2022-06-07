import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from '@core/services';
import { Offer } from '@shared/models';
import { OfferStoreService, UserStoreService } from '@shared/services';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  public offer: Offer = this.stateSS.offers.find(
    offer => offer._id === this.route.snapshot.paramMap.get('_id')
  ) as Offer;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private offerSS: OfferStoreService,
    private userSS: UserStoreService,
    public stateSS: StateStoreService
  ) { }

  ngOnInit(): void {
    if (!this.stateSS.users || this.stateSS.users.length === 0) {
      this.userSS.getUsers();
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
        videoCallDate: [''],
        videoCallHour: [''],
        description: [''],
        workerAssignedId: ['']
      }
    );

    this.reactiveForm.patchValue(this.offer);

    // this.reactiveForm.controls.videoCallHour.setValue(
    //   this.offer.videoCallDate?.substring(11,16) // TODO: reenplazar por this.datePipe.transform(this.offer.videoCallDate, 'HH:mm')
    // );
    
    this.reactiveForm.controls.workerAssignedId.setValue(
      this.offer.workerAssigned?._id
    );
  }

  submitForm() {
    this.isSubmitted = true;

    let offer: Offer = {
      ...this.offer,
      ...this.reactiveForm.getRawValue(),
    };

    let isoUTCOutputDateTime = new Date(this.reactiveForm.controls.videoCallDate.value)
    if (this.reactiveForm.controls.videoCallHour.value) {
      isoUTCOutputDateTime.setHours(this.reactiveForm.controls.videoCallHour.value.split(':')[0])
      isoUTCOutputDateTime.setMinutes(this.reactiveForm.controls.videoCallHour.value.split(':')[1])
    } else {
      isoUTCOutputDateTime.setHours(parseInt(('' + this.reactiveForm.controls.videoCallDate.value).substring(11, 13)) - (new Date().getTimezoneOffset() / 60)); // TODO: arreglar que a cualquier hora esta operación funcione
      isoUTCOutputDateTime.setMinutes(parseInt(('' + this.reactiveForm.controls.videoCallDate.value).substring(15, 17)));
    }
    offer.videoCallDate = isoUTCOutputDateTime.toISOString();

    offer.workerAssignedId = this.reactiveForm.controls.workerAssignedId.value; // TODO: hacer cuando cambie la api
    offer.recruiterAssignedId = this.offer.recruiterAssigned?._id;

    delete offer.videoCallHour;
    
    if (this.reactiveForm.valid) {
      this.offerSS.editOffer(offer);
    } else {
      throw new Error('Form error');
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
