import { AbstractControl } from '@angular/forms';
/**
  * Custom validator function to validate login id.
  * @param {object} control - login id input field control.
  */
export function loginIdValidator(control: AbstractControl) {
    const loginId = control.value; // To get value in input tag.
    let regex: any;
    let type = '';
    // If only numbers are entered, consider as mobile number.
    if (/^\d+$/.test(loginId)) {
        regex = /^\d+$/;
        type = 'mobile';
        // If alphabets are entered or string has @, treat it as email.
    } else if (loginId.includes('@') || /[a-zA-Z]/.test(loginId)) {
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        type = 'email';
    }
    // Mobile number should be of 10 digits
    if ((type === 'mobile') && regex && regex.test(loginId) && (loginId.length === 10)) {
        return null;
    } else if ((type === 'email') && regex && regex.test(loginId)) {
        return null;
    } else {
        return { invalidId: true };
    }
}
