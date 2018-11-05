import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private roter: Router, private authServise: AuthService) { }

  canActivate() {
    if (this.authServise.isLoggedIn()) return true; else return false;
  }
}
