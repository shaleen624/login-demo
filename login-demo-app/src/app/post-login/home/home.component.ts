import { Component, OnInit } from '@angular/core';
import { PublicIpHttpService } from '../services/public-ip-http.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicIp: string;
  loginId: string;
  modalTarget = '';
  modalMsg: string;
  modalType = 'confirm';
  //
  idleState = 'Not started.';
  timedOut = false;
  constructor(
    private publicIpHttpService: PublicIpHttpService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private idle: Idle) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      alert('timed out');
     this.showModal('timed out', '#msgMdl', 'alert');
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.showModal('You will time out in ' + countdown + ' seconds!', '#msgMdl', 'alert');
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
       alert(this.idleState);
    });
    this.reset();
  }


  ngOnInit() {
    this.loginId = this.localStorageService.get('loginId');
    // this.getIP();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  getIP() {
    this.publicIpHttpService.getPublicIp().subscribe((data) => {
      this.publicIp = data['ip'];
    });
  }

  onLogoutClick() {
    // this.modalMsg = 'Are you sure you want to log out?';
    // this.modalTarget = '#msgMdl';
    // this.modalType = 'confirm';
    this.showModal('Are you sure you want to log out?', '#msgMdl', 'confirm');
  }

  showModal (msg, target, type) {
    this.modalTarget = '';
    this.modalMsg = msg;
    this.modalTarget = target;
    this.modalType = type;
    // alert(this.idleState);
  }

  logout() {
    this.localStorageService.clearAll();
    this.router.navigate(['/', 'login']);
  }

}
