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
        description: [''],
        workerAssignedId: ['']
      }
    );

    this.reactiveForm.patchValue(this.offer);
    this.reactiveForm.controls.workerAssignedId.setValue(this.offer.workerAssigned?._id);
  }

  submitForm() {
    this.isSubmitted = true;

    let offerEdited: Offer = this.offer;
    offerEdited = {
      ...offerEdited,
      ...this.reactiveForm.getRawValue()
    };
    offerEdited.workerAssignedId = this.reactiveForm.controls.workerAssignedId.value; // TODO: hacer cuando cambie la api
    offerEdited.recruiterAssignedId = this.offer.recruiterAssigned?._id;

    if (this.reactiveForm.valid) {
      this.offerSS.editOffer(offerEdited);
    } else {
      throw new Error('Form error');
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
