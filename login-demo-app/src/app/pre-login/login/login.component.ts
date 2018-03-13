import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
  mobileNumber = '[0-9]*';
  passPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}';

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
        Validators.pattern(this.mobileNumber)]]
    });
  }

  get userName(): String {
    return this.loginForm.get('userName').value;
  }

  submitForm () {
    console.log('submitted');
    this.localStorageService.set('name', 'shaleen');
    this.router.navigate(['/', 'home']);
  }


}
