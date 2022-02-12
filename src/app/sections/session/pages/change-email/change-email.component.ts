import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from '@core/services';
import { User } from '@shared/models';
import { SessionStoreService } from '@sections/session/services';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmail implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private sessionStoreService: SessionStoreService,
    private stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: ['']
      }
    );

    this.reactiveForm.controls.email.setValue(this.stateStoreService.state.session?.user?.email);
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user = {
      _id: this.stateStoreService.state.session?.user?._id,
      email: this.reactiveForm.get('email')!.value
    } as User;

    if (this.reactiveForm.valid) {
      this.sessionStoreService.changeEmail(user);
    } else {
      throw new Error('Form error');
    }
  }
  
}
