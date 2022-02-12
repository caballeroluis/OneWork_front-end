import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from '@core/services';
import { User } from '@shared/models';
import { SessionStoreService } from '@sections/session/services';
import { Subscription } from 'rxjs';
import { Session } from '@sections/session/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  private state!: Subscription;
  public session!: Session;
  
  constructor(
    private formBuilder: FormBuilder,
    private sessionStoreService: SessionStoreService,
    private stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
    this.formatReactiveForm();
    this.state = this.stateStoreService.state$.subscribe(state => {
      this.session = state.session;
    });
  }

  formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        name: [''],
        corporationName: [''],
        role: ['']
      }
    );

    this.reactiveForm.controls.name.setValue(this.stateStoreService.state.session?.user?.name);
    this.reactiveForm.controls.corporationName.setValue(this.stateStoreService.state.session?.user?.corporationName);
    this.reactiveForm.controls.role.setValue(this.stateStoreService.state.session?.user?.role);
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user = {
      _id: this.stateStoreService.state.session?.user?._id,
      name: this.reactiveForm.get('name')!.value,
      corporationName: this.reactiveForm.get('corporationName')!.value,
      role: this.reactiveForm.get('role')!.value
    } as User;

    if (this.reactiveForm.valid) {
      this.sessionStoreService.updateUserProfile(user);
    } else {
      throw new Error('Form error');
    }
  }

  ngOnDestroy() {
    this.state.unsubscribe();
  }
  
}
