import { Injectable } from '@angular/core';
import { NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {

  private user:Observable<firebase.User>;
  private userDetail: firebase.User = null;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private zone: NgZone) {
    this.user = _firebaseAuth.user;
    this.user.subscribe(user =>{
      if(user){
        this.userDetail = user;
        console.log(this.userDetail);
        this.userDetail.displayName;
      } else { this.userDetail = null }
    })
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInRegular(user: any) {
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, user.password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  isLoggedIn(): boolean {
    if (this.userDetail) return true; else return false;
  }

  logout() {
    this._firebaseAuth.auth.signOut().then(res => {
      this.zone.run(() => this.router.navigate(['/']));      
    })
  }

  displayUserName() {
    if(this.userDetail) return this.userDetail.displayName; else return false;
  }
  photoUrl() {
    if(this.userDetail) return this.userDetail.photoURL; else return false;
  }
}

