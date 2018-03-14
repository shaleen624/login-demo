import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

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
  // tslint:disable-next-line:quotemark
   passPattern = "(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$";
  // passPattern = '^(?=\P{Ll}*\p{Ll})(?=\P{Lu}*\p{Lu})(?=\P{N}*\p{N})(?=[\p{L}\p{N}]*[^\p{L}\p{N}])[\s\S]{8,}$';

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
      userName: ['', [Validators.required,
      Validators.pattern(this.mobileNumber)]],

      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passPattern)]]
    });
  }

  get userName(): AbstractControl {
    return this.loginForm.get('userName');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  checkForPassword () {
    this.showPassError = false;
    if (this.loginForm.get('password').status === 'INVALID') {
      this.showPassError = true;
    }
  }

  submitForm () {
    console.log('submitted');
    console.log('form', this.loginForm.get('userName'))
    const loginId = this.loginForm.get('userName').value;
    this.localStorageService.set('loginId', loginId);
    this.router.navigate(['/', 'home']);
  }


}
