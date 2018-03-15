import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { appConstants } from '../../utilities/appConstants';
import { loginIdValidator } from '../utilities/custom-validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constants = appConstants;
  showPassError = false;
  showIdError = false;
  passPattern = /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
  // Set this to true to see the form and fiels status.
  showFormStatus = false;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
  /**
   * Init lifecycle hook.
   */
  ngOnInit() {
    this.createForm();
  }
  /**
   * Init lifecycle hook.
   */
  createForm() {
    this.loginForm = this.formBuilder.group({
      loginId: ['', [Validators.required,
        loginIdValidator]],

      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(this.passPattern)
      ]]
    });
  }
  /**
   * Getter for login id form control field.
   */
  get loginId(): AbstractControl {
    return this.loginForm.get('loginId');
  }
  /**
   * Getter for password form control field.
   */
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
  /**
   * Function to show error message for 'Login id' on blur.
   */
  checkLoginId () {
    this.showIdError = false;
    if (this.loginId.status === 'INVALID') {
      this.showIdError = true;
    }
  }
  /**
   * Function to show error message for 'password' on blur.
   */
  checkForPassword () {
    this.showPassError = false;
    if (this.password.status === 'INVALID') {
      this.showPassError = true;
    }
  }
  /**
   * Function called on click of 'Login'.
   */
  submitForm () {
    if (!this.loginForm.invalid) {
    console.log('submitted with', this.loginId.value);
    this.localStorageService.set(appConstants.USERNAME_KEY, this.loginId.value);
    this.router.navigate(['/', 'home']);
    }
  }


}
