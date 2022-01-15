import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Session } from '@core/models';
import { SessionStoreService } from '@core/services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
        password: ['']
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    
    const session = <Session>{
      email: this.reactiveForm.get('email')!.value,
      password: this.reactiveForm.get('password')!.value
    };

    if (this.reactiveForm.valid) {
      this.sessionStoreService.login(session);
    } else {
      throw new Error('Form error');
    }
  }
  
}
