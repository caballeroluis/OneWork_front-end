import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Session } from '@core/models';
import { SessionStorageService } from '@core/services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  
  constructor(
    private _sessionStoreService: SessionStorageService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._formatReactiveForm();
  }

  private _formatReactiveForm() {
    this.reactiveForm = this.formBuilder.group(
      {
        email: [''],
        password: [''],
        rememberUser: [null],
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    
    const session = <Session>{
      email: this.reactiveForm.get('email')!.value,
      password: this.reactiveForm.get('password')!.value,
      rememberUser: this.reactiveForm.get('rememberUser')!.value
    };

    if (this.reactiveForm.valid) {
      this._sessionStoreService.login(session);
    } else {
      throw new Error('Form error');
    }
  }
  
}
