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
  public workerSelected = this.offer.workerAssigned?._id;

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
        videoCallDate: [''],
        videoCallHour: [''],
        description: [''],
        workerAssignedId: ['']
      }
    );

    this.reactiveForm.patchValue(this.offer);
    this.reactiveForm.controls.videoCallHour.setValue(
      this.offer.videoCallDate?.substring(11,16)
    );
    this.reactiveForm.controls.workerAssignedId.setValue(
      this.offer.workerAssigned?._id
    );
  }

  submitForm() {
    this.isSubmitted = true;

    let offerEdited: Offer = {
      ...this.offer,
      ...this.reactiveForm.getRawValue(),
      videoCallDate:
        new Date(this.reactiveForm.controls.videoCallDate.value).toISOString().substring(0, 10) +
        this.offer.videoCallDate?.substring(10, 11) +
        this.reactiveForm.controls.videoCallHour.value +
        this.offer.videoCallDate?.substring(16, 24) // TODO: aclarar q es la T y mier si esta forma o la de abajo
        // new Date(this.reactiveForm.controls.videoCallDate.value).toISOString().substring(0, 11) +
        // this.reactiveForm.controls.videoCallHour.value +
        // new Date(this.reactiveForm.controls.videoCallDate.value).toISOString().substring(16, 24)
    };
    offerEdited.workerAssignedId = this.reactiveForm.controls.workerAssignedId.value; // TODO: hacer cuando cambie la api
    delete offerEdited.videoCallHour;
    offerEdited.recruiterAssignedId = this.offer.recruiterAssigned?._id;

    if (
      this.offer.videoCallDate === new Date(this.reactiveForm.controls.videoCallDate.value).toISOString().substring(0, 10) +
      this.offer.videoCallDate?.substring(10, 11) +
      this.reactiveForm.controls.videoCallHour.value +
      this.offer.videoCallDate?.substring(16, 24)
    ) {
      delete offerEdited.videoCallDate;
    }
    
    if (this.reactiveForm.valid) {
      this.offerSS.editOffer(offerEdited);
    } else {
      throw new Error('Form error');
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
