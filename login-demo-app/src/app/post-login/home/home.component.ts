import { Component, OnInit } from '@angular/core';
import { PublicIpHttpService } from '../services/public-ip-http.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { appConstants } from '../../utilities/appConstants';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  publicIp: string;
  loginId: string;
  constants = appConstants;
  modalMsg: string;
  modalType: string;

  constructor(
    private publicIpHttpService: PublicIpHttpService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private idle: Idle) { }

  /**
   * Init lifecycle hook.
   */
  ngOnInit() {
    this.loginId = this.localStorageService.get(appConstants.USERNAME_KEY);
    this.checkForIdle();
  }
  /**
   * Function to call the http service to retrieve
   * the public IP of the system.
   */
  getIP() {
    this.publicIpHttpService.getPublicIp().subscribe((data) => {
      this.publicIp = data['ip'];
    });
  }
  /**
   * Function to set the message and type of modal.
   *  @param {string} msg
   *  @param {string} type
   */
  setModalAttributes(msg, type) {
    this.modalMsg = msg;
    this.modalType = type;
  }
  /**
   * Function called on click of 'Logout'.
   */
  logout() {
    this.localStorageService.clearAll();
    this.idle.ngOnDestroy(); // includes this.idle.stop() and this.clearInterrupts() both.
    this.router.navigate(['login']);
  }
  /**
   * Function to reset the idle timer.
   */
  resetIdleTimer() {
    this.idle.watch();
  }
  /**
   * Function to manage the idle state of page.
   */
  checkForIdle() {
    // sets an idle timeout of 60 seconds.
    this.idle.setIdle(appConstants.IDLE_WARNING_TIME);
    // sets a timeout period of '30' seconds. after '90' seconds of inactivity,
    // the user will be considered timed out.
    this.idle.setTimeout(appConstants.IDLE_LOGOUT_TIME);
    // sets the default interrupts, in this case, things like clicks, scrolls,
    // touches to the document.
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    // Time out complete event subscriber.
    this.idle.onTimeout.subscribe(() => {
      $('#' + appConstants.HOME_POPUP_ID).modal('hide');
      this.logout();
    });
    // Timeout warning event subscriber.
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      if (countdown === appConstants.IDLE_LOGOUT_TIME) {
        // Showing the warning popup when 30 sec are left for timeout.
        this.setModalAttributes(appConstants.IDLE_MSG, appConstants.MODAL_TYPE_ALERT);
        $('#' + appConstants.HOME_POPUP_ID).modal('show');
      }
    });
    this.resetIdleTimer();
  }

}
