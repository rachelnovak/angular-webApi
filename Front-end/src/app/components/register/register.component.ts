import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user-service.service';
import { createValidatorArr1, createValidatorArr2 } from '../../shared/validation/validation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {


  //----------------PROPERTIES-------------------

  title = 'valid data';
  formGroup: FormGroup;
  obj: typeof Object = Object;


  //----------------CONSTRACTOR-------------------

  constructor(private userService: UserService, private router: Router) {
    let formGroupConfig = {
      UserName: new FormControl("",createValidatorArr1("username",2,10)),
      Age: new FormControl("",createValidatorArr2("age", 18, 120))
    };

    this.formGroup = new FormGroup(formGroupConfig);
  }

  //----------------METHODS-------------------
  
/**
 * function
 * send the user 
 */
  submitRegisterSave() { 
    this.userService.registerUserValid( this.formGroup.value);
  }

  
}

