import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from '@core/services';
import { Offer } from '@shared/models';
import { OfferStoreService } from '@shared/services';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  private offer: Offer = new Offer();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private offerSS: OfferStoreService,
    public stateSS: StateStoreService
  ) { }

  ngOnInit(): void {
    this.offer = this.stateSS.offers.find(
      offer => offer._id === this.route.snapshot.paramMap.get('_id')
    ) as Offer;

    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        salary: [''],
        title: [''],
        requirements: [''],
        abandoned: [false],
        technicianChecked: [false],
        workplaceAddress: [''],
        videoCallLink: [''],
        description: [''],
        worker: null
      }
    );

    this.reactiveForm.patchValue(this.offer);
    console.log(this.reactiveForm.getRawValue())
  }

  submitForm() {
    this.isSubmitted = true;

    let offer: Offer = this.reactiveForm.getRawValue();
    // offer.workerAssigned = offer.workerAssigned?._id; // TODO: hacer cuando cambie la api
    // offer.recruiterAssigned = offer.recruiterAssigned?._id;

    if (this.reactiveForm.valid) {
      this.offerSS.editOffer(offer);
    } else {
      throw new Error('Form error');
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
