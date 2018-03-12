import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PublicIpHttpService {

  constructor(private http: HttpClient) { }

  getPublicIp() {
    return this.http.get('https://api.ipify.org?format=json')
      .map((response) => {
        return response;
      });
  }
}
