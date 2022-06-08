import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from '@shared/models';
import { SessionStoreService } from '@sections/session/services';
import { StateStoreService } from '@core/services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  
  constructor(
    private location: Location,
    private sessionSS: SessionStoreService,
    private stateSS: StateStoreService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.stateSS.session.token !== '') {
      this.location.back();
    }
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: [''],
        password: ['']
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user: User = this.reactiveForm.getRawValue();

    if (this.reactiveForm.valid) {
      this.sessionSS.login(user);
    } else {
      throw new Error('Form error');
    }
  }
  
}
