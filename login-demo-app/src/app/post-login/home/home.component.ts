import { Component, OnInit } from '@angular/core';
import { PublicIpHttpService } from '../services/public-ip-http.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicIp: string;
  userName: string;
  constructor(
    private publicIpHttpService: PublicIpHttpService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    this.userName = this.localStorageService.get('name');
    this.getIP();
  }

  getIP() {
    this.publicIpHttpService.getPublicIp().subscribe((data) => {
      this.publicIp = data['ip'];
    });
  }

  logout () {
    this.localStorageService.clearAll();
    this.router.navigate(['/', 'login']);
  }

}
