import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {strictEqual} from 'assert';

export class SignupFormControl extends FormControl {
  label: string;
  property: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.property = property;

  }

  getControlErrors(): string[] {
    let messages = new Array<string>();
    if (this.errors) {
      Object.keys(this.errors).forEach((k) => {
        switch (k) {
          case 'required':
            messages.push(`${this.label} is required`);
            break;
          case 'minlength':
            messages.push(`You need at least ${this.errors['minlength'].requiredLength} for ${this.label}`);
            break;
          case 'pattern':
            messages.push(`Invalid input`);
            break;

        }
      });
    }
    return messages;

  }
}

export class SignupFormGroup extends FormGroup {

  constructor() {
    super({
      firstname: new SignupFormControl('First Name', 'firstname', '',
        Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new SignupFormControl('Family Name', 'lastname', '',
        Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new SignupFormControl('Email', 'email', '',
        Validators.compose([Validators.required, Validators.email])),
      password: new SignupFormControl('Password', 'password', '',
        Validators.compose([Validators.required, Validators.minLength(6)])),
      tel: new SignupFormControl('Telephone', 'tel', '',
        Validators.compose([Validators.pattern('^[0-9]*$'), Validators.required])),
      postCode: new SignupFormControl('Postal Code', 'postCode', '',
        Validators.compose([Validators.pattern('^[0-9]*$'), Validators.minLength(7), Validators.maxLength(7)])),
      city: new SignupFormControl('City', 'city', '', Validators.compose([Validators.required])),
      address1: new SignupFormControl('Address1', 'address1', '', Validators.compose([Validators.required])),
      building: new SignupFormControl('Building', 'building', '', Validators.compose([Validators.required]))

    });
  }

  getErrors(): string[] {
    let messages = new Array<string>();
    for (let k in this.controls) {
      let control = this.controls[k] as SignupFormControl;
      control.getControlErrors().forEach((m) => messages.push(m));
    }
    return messages;
  }


}

