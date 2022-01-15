import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@core/models';
import { SessionStoreService, UserStoreService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  private detailSubscription!: Subscription;
  
  constructor(
    private formBuilder: FormBuilder,
    private userStoreService: UserStoreService,
    public sessionStoreService: SessionStoreService,
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: [''],
        password: [''],
        role: ['']
      }
    );

    this.detailSubscription = this.sessionStoreService.session$.subscribe(session => {
      this.reactiveForm.controls.email.setValue(session.email);
      this.reactiveForm.controls.password.setValue(session.password);
      this.reactiveForm.controls.role.setValue(session.role);
    });
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user = <User>{
      email: this.reactiveForm.get('email')!.value,
      password: this.reactiveForm.get('password')!.value,
      role: this.reactiveForm.get('role')!.value
    };

    if (this.reactiveForm.valid) {
      this.userStoreService.register(user);
      this.detailSubscription.unsubscribe();
    } else {
      throw new Error('Form error');
    }
  }
  
}
