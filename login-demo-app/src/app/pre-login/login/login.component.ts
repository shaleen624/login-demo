import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { appConstants } from '../../utilities/appConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassError = false;
  emailPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
  mobileNumber = '[0-9]*';
  // passPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}';
   passPattern = /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      loginId: ['', [Validators.required]],

      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(this.passPattern)
      ]]
    });
  }

  get loginId(): AbstractControl {
    return this.loginForm.get('loginId');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  validateLoginId () {
    console.log(this.loginId);
    let regex: any;
    // If only numbers are entered, consider as mobile number
    if (/^\d+$/.test(this.loginId.value)) {
      regex = /^\d+$/;
    // If alphabets are entered or string has @, treat it as email.
    } else if (this.loginId.value.indexOf('@') > 0 || /[a-zA-Z]/.test(this.loginId.value)) {
      regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    }
    console.log(regex.test(this.loginId.value));
  }

  checkForPassword () {
    this.showPassError = false;
    if (this.password.status === 'INVALID') {
      this.showPassError = true;
    }
  }

  submitForm () {
    console.log('submitted with', this.loginId.value);
    this.localStorageService.set(appConstants.USERNAME_KEY, this.loginId.value);
    this.router.navigate(['/', 'home']);
  }


}
