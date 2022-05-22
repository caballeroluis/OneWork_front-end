import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@shared/models';
import { SessionStoreService } from '@sections/session/services';
import { StateStoreService } from '@core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public sessionSS: SessionStoreService,
    public stateSS: StateStoreService
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        name: [''],
        surname1: [''],
        surname2: [''],
        recruiterName: [''],
        recruiterSurname1: [''],
        recruiterSurname2: [''],
        contactData: [''],
        corporationName: [''],
        descriptionCorporate: [''],
        international: [false],
      }
    );

    this.reactiveForm.patchValue(this.stateSS.session.user);
  }

  submitForm() {
    this.isSubmitted = true;

    const user: User = this.reactiveForm.getRawValue();
    user._id = this.stateSS.session?.user._id;
    if (this.stateSS.session.user?.role === 'recruiter') {
      delete user.name;
      delete user.surname1;
      delete user.surname2;
    }
    if (this.stateSS.session.user?.role === 'worker') {
      delete user.recruiterName;
      delete user.recruiterSurname1;
      delete user.recruiterSurname2;
    } 

    if (this.reactiveForm.valid) {
      this.sessionSS.updateUserProfile(user);
    } else {
      throw new Error('Form error');
    }
  }
  
}
