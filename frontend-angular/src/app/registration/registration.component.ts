import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  handleRegistration() {
    if (this.registrationForm.valid) {
      const { username, email, password } = this.registrationForm.value;
      if (password === this.registrationForm.value.passwordConfirm) {
        const data = { name: username, email: email, password: password };
  
        const jsonData = JSON.stringify(data);
  
        this.http.post<any>('/api/v1/auth/register', jsonData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .pipe(
          catchError(error => {
            console.error(error);
            return error;
          })
        )
    .subscribe(response => {
  if (response && response.error && response.error.token === 'fail') {
    this.errorMessage = 'This username is already in use. Please try another one.';
  } else {
    this.authService.login(response.token, username);
    localStorage.setItem('username', username);
    this.router.navigate(['/home']);
  }
});

      } else {
        alert('Passwords do not match. Please make sure the passwords match.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
