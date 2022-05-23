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
    this.user.role = role;
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: [''],
        password: [''],
        name: [''],
        recruiterName: [''],
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

    if (this.reactiveForm.valid) {
      this.sessionSS.register(this.user);
    } else {
      throw new Error('Form error');
    }
  }

}

