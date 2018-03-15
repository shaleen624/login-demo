import { Injectable } from '@angular/core';

/**
 * Service that will hold the shared variables and functions
 * used across the app.
 */
@Injectable()
export class CommonService {

  // Variable used to show/ hide the loading message.
  loading = false;
  constructor() { }

}
