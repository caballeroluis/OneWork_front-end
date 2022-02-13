import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from '@core/services';
import { User } from '@shared/models';
import { SessionStoreService } from '@sections/session/services';
import { State } from '@core/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmail implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  private stateSubscription!: Subscription;
  public state!: State;
  
  constructor(
    private formBuilder: FormBuilder,
    private sessionStoreService: SessionStoreService,
    private stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.stateStoreService.state$.subscribe(state => {
      this.state = state;
    });
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: ['']
      }
    );

    this.reactiveForm.patchValue(this.state?.session.user);
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user: User = this.reactiveForm.getRawValue();
    user._id = this.state?.session.user._id

    if (this.reactiveForm.valid) {
      this.sessionStoreService.changeEmail(user);
    } else {
      throw new Error('Form error');
    }
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  
}
