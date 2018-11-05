import { Component, OnInit } from '@angular/core';
import { NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService: AuthService;
  private router: Router;
  private user = {
    email: '',
    password: ''
  };
  constructor(router: Router, authService: AuthService, private zone: NgZone) {
    this.router = router;
    this.authService = authService;
  }

  ngOnInit() {
  }
  signinWithFacebook () {
    this.authService.signInWithFacebook().then(res => {
      console.log(res);
      this.router.navigate([''])
    })
    .catch(err => console.log(err));
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle().then(res => {
      console.log(res);
      this.zone.run(() => this.router.navigate(['/']));    
    })
  }
  signInWithEmail() {
    this.authService.signInRegular(this.user).then(res => {
      console.log(res);
      this.zone.run(() => this.router.navigate(['/']))    
      .catch((err) => console.log('error: ' + err));;
    });
  }

}
