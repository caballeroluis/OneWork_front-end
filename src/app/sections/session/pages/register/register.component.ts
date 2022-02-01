import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Session } from '@sections/session/models';
import { SessionStoreService } from '@sections/session/services';
import { User } from '@shared/models';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  
  constructor(
    private sessionStoreService: SessionStoreService,
    private formBuilder: FormBuilder,
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
        role: ['recruiter']
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    
    const user = {
      email: this.reactiveForm.get('email')!.value,
      password: this.reactiveForm.get('password')!.value,
      name: this.reactiveForm.get('name')!.value,
      role: this.reactiveForm.get('role')!.value
    } as User;

    if (this.reactiveForm.valid) {
      this.sessionStoreService.register(user);
    } else {
      throw new Error('Form error');
    }
  }

}

