import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Session } from '@core/models';
import { SessionStoreService } from '@core/services';
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
        role: ['']
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    
    const session = <Session>{
      user: {
        email: this.reactiveForm.get('email')!.value,
        password: this.reactiveForm.get('password')!.value,
        role: this.reactiveForm.get('role')!.value
      }
    };

    if (this.reactiveForm.valid) {
      this.sessionStoreService.register(session);
    } else {
      throw new Error('Form error');
    }
  }

}

