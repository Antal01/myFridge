import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.http.post<any>('/api/v1/auth/authenticate', {
      name: this.loginForm.value.username,
      password: this.loginForm.value.password
    })
      .pipe(
        catchError(error => {
          console.error(error);
          return error;
        })
      )
      .subscribe(response => {
        if (response && response.error) {
          this.errorMessage = 'Authentication failed. Please check your credentials.';
        } else {
          this.authService.login(response.token, this.loginForm.value.username);
          localStorage.setItem('username', this.loginForm.value.username);
          this.router.navigate(['/']);
        }
      });

  }
}
