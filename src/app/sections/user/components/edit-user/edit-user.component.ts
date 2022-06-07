import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StateStoreService } from '@core/services';
import { User } from '@shared/models';
import { UserStoreService } from '@shared/services';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  public user: User = this.stateSS.users.find(
    user => user._id === this.route.snapshot.paramMap.get('_id')
  ) as User;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public stateSS: StateStoreService,
    public userSS: UserStoreService
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        name: [''],
        email: [''],
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

    this.reactiveForm.patchValue(this.user);
  }
  
  submitForm() {
    this.isSubmitted = true;

    const user: User = this.reactiveForm.getRawValue();
    user._id = this.user._id;
    user.role = this.user.role;
    if (this.user.role === 'recruiter') {
      delete user.name;
      delete user.surname1;
      delete user.surname2;
    }
    if (this.user.role === 'worker') {
      delete user.recruiterName;
      delete user.recruiterSurname1;
      delete user.recruiterSurname2;
      delete user.corporationName;
      delete user.descriptionCorporate;
      delete user.international;
    } 

    if (this.reactiveForm.valid) {
      this.userSS.updateUser(user);
    } else {
      throw new Error('Form error');
    }
  }

}
