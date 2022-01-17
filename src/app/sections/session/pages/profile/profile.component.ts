import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from '@core/services';
import { Session } from '@sections/session/models';
import { SessionStoreService } from '@sections/session/services';

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
    private sessionStoreService: SessionStoreService,
    public stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: [''],
        password: ['']
      }
    );

    this.reactiveForm.controls.email.setValue(this.stateStoreService.state?.session?.user?.email);
    this.reactiveForm.controls.password.setValue(this.stateStoreService.state?.session?.user?.password);
  }

  submitForm() {
    this.isSubmitted = true;
    
    const session = <Session>{
      user: {
        _id: this.stateStoreService.state?.session?.user?._id,
        email: this.reactiveForm.get('email')!.value,
        password: this.reactiveForm.get('password')!.value,
      }
    };

    if (this.reactiveForm.valid) {
      this.sessionStoreService.updateUserProfile(session);
    } else {
      throw new Error('Form error');
    }
  }
  
}
