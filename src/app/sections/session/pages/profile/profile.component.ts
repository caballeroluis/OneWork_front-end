import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from '@core/services';
import { User } from '@shared/models';
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
    private stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: [''],
        password: [''],
        name: [''],
        role: ['']
      }
    );

    this.reactiveForm.controls.email.setValue(this.stateStoreService.state.session?.user?.email);
    this.reactiveForm.controls.password.setValue(this.stateStoreService.state.session?.user?.password);
    this.reactiveForm.controls.name.setValue(this.stateStoreService.state.session?.user?.name);
    this.reactiveForm.controls.role.setValue(this.stateStoreService.state.session?.user?.role);
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user = {
      _id: this.stateStoreService.state.session?.user?._id,
      email: this.reactiveForm.get('email')!.value,
      password: this.reactiveForm.get('password')!.value,
      name: this.reactiveForm.get('name')!.value,
      role: this.reactiveForm.get('role')!.value
    } as User;

    if (this.reactiveForm.valid) {
      this.sessionStoreService.updateUserProfile(user);
    } else {
      throw new Error('Form error');
    }
  }
  
}
