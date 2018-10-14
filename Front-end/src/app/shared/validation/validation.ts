import {   ValidatorFn } from '@angular/forms';

export function createValidatorArr1(cntName: string, min: number, max: number): Array<ValidatorFn> {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && f.value.length> max ? { "val": `${cntName} is max ${max} chars` } : null,
      f => f.value && f.value.length<min? { "val": `${cntName} is min ${min} chars` } : null
    ];
  }
  export function createValidatorArr2(cntName: string, min: number, max: number): Array<ValidatorFn> {
    return [
      f =>      !f.value ? { "val": `${cntName} is required` } : null,
      f=>!Number(f.value)? {"val" : `${cntName} must be number`}:null,
      f => f.value  && Number( f.value )&&f.value> max ? { "val": `${cntName} is max ${max} years` } : null,
      f => f.value  && Number( f.value )&&f.value < min ? { "val": `${cntName} is min ${min} years` } : null
    ];
  }