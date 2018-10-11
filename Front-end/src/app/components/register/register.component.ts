import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user-service.service';


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
      UserName: new FormControl("", this.createValidatorArr1("username",2,10)),
      Age: new FormControl("", this.createValidatorArr2("age", 18, 120))
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

  createValidatorArr1(cntName: string, min: number, max: number): Array<ValidatorFn> {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && f.value.length> max ? { "val": `${cntName} is max ${max} chars` } : null,
      f => f.value && f.value.length<min? { "val": `${cntName} is min ${min} chars` } : null
    ];
  }
  createValidatorArr2(cntName: string, min: number, max: number): Array<ValidatorFn> {
    return [
      f =>      !f.value ? { "val": `${cntName} is required` } : null,
      f=>!Number(f.value)? {"val" : `${cntName} must be number`}:null,
      f => f.value  && Number( f.value )&&f.value> max ? { "val": `${cntName} is max ${max} years` } : null,
      f => f.value  && Number( f.value )&&f.value < min ? { "val": `${cntName} is min ${min} years` } : null
    ];
  }
}

