import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StateStoreService } from '@core/services';
import { User } from '@shared/models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public reactiveForm!: FormGroup;
  public isSubmitted = false;
  public user: User = this.stateSS.users.find(
    user => user._id === this.route.snapshot.paramMap.get('_id')
  ) as User;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public stateSS: StateStoreService
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

    this.reactiveForm.patchValue(this.user);
  }
  
  submitForm() {
    this.isSubmitted = true;

   
  }

}
