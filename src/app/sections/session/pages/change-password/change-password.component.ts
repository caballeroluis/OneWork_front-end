import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from '@core/services';
import { User } from '@shared/models';
import { SessionStoreService } from '@sections/session/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePassword implements OnInit {

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
        password: ['']
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user = this.reactiveForm.getRawValue();
    user._id = this.stateStoreService.state.session?.user?._id

    if (this.reactiveForm.valid) {
      this.sessionStoreService.changePassword(user);
    } else {
      throw new Error('Form error');
    }
  }
  
}
