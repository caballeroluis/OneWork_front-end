import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@shared/models';
import { UserStoreService } from '@shared/services';
import { StateStoreService } from '@core/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private userSS: UserStoreService,
    private stateSS: StateStoreService
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        password: [''] // TODO: confirm password field
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user: User = this.reactiveForm.getRawValue();
    user._id = this.stateSS.session?.user._id

    if (this.reactiveForm.valid) {
      this.userSS.changePassword(user);
    } else {
      throw new Error('Form error');
    }
  }
  
}
