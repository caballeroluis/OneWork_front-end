import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Session } from '@core/models';
import { SessionStoreService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  public sessionDetailSubscription!: Subscription;
  public sessionDetail!: Session;
  
  constructor(
    private formBuilder: FormBuilder,
    public sessionStoreService: SessionStoreService
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

    this.sessionDetailSubscription = this.sessionStoreService.session$.subscribe(session => {
      this.sessionDetail = session;
      this.reactiveForm.controls.email.setValue(session.user.email);
      this.reactiveForm.controls.password.setValue(session.user.password);
    });
  }

  submitForm() {
    this.isSubmitted = true;
    
    const session = <Session>{
      user: {
        _id: this.sessionDetail.user._id,
        email: this.reactiveForm.get('email')!.value,
        password: this.reactiveForm.get('password')!.value,
      }
    };

    if (this.reactiveForm.valid) {
      this.sessionStoreService.update(session);
      this.sessionDetailSubscription.unsubscribe();
    } else {
      throw new Error('Form error');
    }
  }
  
}
