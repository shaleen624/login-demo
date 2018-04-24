# Login-demo

The project is build using Angular version 4 and has following features and implementations.

## Reactive form, lazy loading, custom validator, interceptor, route guard, log out on page idle, a custom loading text for HTTP calls.

## 1. A lazy and an eagrly loaded module.
   Project has 2 module - pre login and post login, post login module should is lazily loaded after login request
   Pre login module has 2 components LoginComponent (under pre login module url : /login) and HomeComponent (under post login module url : /home)
## 2. LoginComponent description
It has a reactive form implementation with 3 fields and a custom validator implemented for userId validation.

  a) Input field(LoginId) accepts both Phonenum and Email only, validations applied accordingly.
  
  b) Input field(Password) accepts password, it must contain 1 uppercase, 1 lowercase, 1 number and 1 special character and minimum 8 characters long and maximum 20 characters  apply validations accordingly
  
  c) Submit button - User is navigated to  the home page only after both fields are valid and Submit is clicked. Route guared is implemented to prevent navigation by changing URL.
  
On submit loginId is stored in localStorage, using a LocalStorageService
## 3.HomeComponent description
  a) It reads value from localStorage and display “Hi {{loginId}}” where loginId is the value stored in localStorage.
  ng-idle library implementation - If user is ideal for 1 minute,  a message appears saying “You will be logged out in 30 seconds. Press Ok   to stay logged in”.

  b) It has a Logout button.On click of it, msg “Do you really want to logout ? “ On yes, the values stored in localstorage  is cleared and user lands on LoginComponet(i.e. /login), else stays on that page.

  c) It has another button which calls a public api to fetch the IP address of your system. On click of this button an http_interceptor is called to show loading…, till the time public api service doesn’t return anything. A delay of 2 seconds is used to make the loading...  visible.
