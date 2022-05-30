import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionStoreService } from '@sections/session/services';
import { User } from '@shared/models';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  public user: User = new User();
  
  constructor(
    private sessionSS: SessionStoreService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
  }

  roleChange(role: string) {
    this.user = new User();
    this.user = this.reactiveForm.getRawValue();
    this.user.role = role;
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: [''],
        password: [''],
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
        role: ['']
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;

    this.user = this.reactiveForm.getRawValue();
    if (this.user?.role === 'recruiter') {
      delete this.user.name;
      delete this.user.surname1;
      delete this.user.surname2;
    }
    if (this.user?.role === 'worker') {
      delete this.user.recruiterName;
      delete this.user.recruiterSurname1;
      delete this.user.recruiterSurname2;
      delete this.user.corporationName;
      delete this.user.descriptionCorporate;
      delete this.user.international;
    } 
    if (this.reactiveForm.valid) {
      this.sessionSS.register(this.user);
    } else {
      throw new Error('Form error');
    }
  }

}
