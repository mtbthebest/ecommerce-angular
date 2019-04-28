import {Component, Inject, OnInit} from '@angular/core';
import {SignupFormGroup} from './signup.form';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: SignupFormGroup;
  submitted: boolean;

  constructor(private http: HttpClient, @Inject('url') private url, private router: Router) {
    this.form = new SignupFormGroup();
    this.submitted = false;
  }

  ngOnInit() {
  }

  submit() {
    this.submitted = true;
    // console.log(this.submitted)
    // Object.keys(this.form.controls).map(key =>
    // console.log(this.form.controls[key].errors))
    if (this.form.valid) {
      this.form = new SignupFormGroup();
      this.http.post(`${this.url}/signup`, this.form.value).subscribe((res) =>
        this.router.navigateByUrl('/login'));
      this.form.reset();
      this.submitted = false;
    }


  }

  getControls() {
    return Object.keys(this.form.controls);
  }

}
