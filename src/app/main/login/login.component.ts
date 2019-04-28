import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  errors = new Array<String>();

  constructor(private router: Router, private http: HttpClient,
              @Inject('url') private url, private cookies: CookieService) {
    this.router = router;

  }

  ngOnInit() {
  }

  submit(form) {
    this.submitted = true;
    this.errors = [];
    if (form.valid) {
      this.http.post(`${this.url}/login`, form.value).subscribe((res) => {
        if (res['result'] == 'valid') {
          this.cookies.set('user_id', res['id']);
          this.submitted = false;
          this.router.navigateByUrl('/shop');
        } else {
          this.errors.push('Invalid email/password');
          form.controls['email'].setErrors({'incorrect': true});

        }
      });

    }
  }

}
