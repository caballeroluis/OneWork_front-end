import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private sessionStoreService: SessionStoreService
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

    this.reactiveForm.patchValue(this.sessionStoreService?.session.user);
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user: User = this.reactiveForm.getRawValue();
    user._id = this.sessionStoreService?.session.user._id

    if (this.reactiveForm.valid) {
      this.sessionStoreService.changeEmail(user);
    } else {
      throw new Error('Form error');
    }
  }
  
}
