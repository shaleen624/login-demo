import { Component, OnInit } from '@angular/core';
import { PublicIpHttpService } from '../services/public-ip-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicIp: string;
  constructor(private publicIpHttpService: PublicIpHttpService) { }

  ngOnInit() {
    this.getIP();
  }

  getIP() {
    this.publicIpHttpService.getPublicIp().subscribe((data) => {
      this.publicIp = data['ip'];
    });
  }

}
