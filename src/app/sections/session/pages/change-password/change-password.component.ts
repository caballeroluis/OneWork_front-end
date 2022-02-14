import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@shared/models';
import { SessionStoreService } from '@sections/session/services';
import { StateStoreService } from 'src/app/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePassword implements OnInit {
// TODO: hacer que funcione esto, cambiar pass y profile de nuevo con stateStoreService
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
    
    const user: User = this.reactiveForm.getRawValue();
    user._id = this.stateStoreService?.state?.session.user._id

    if (this.reactiveForm.valid) {
      this.sessionStoreService.changePassword(user);
    } else {
      throw new Error('Form error');
    }
  }
  
}
