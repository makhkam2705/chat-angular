import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import firebase from "firebase/compat/app";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User | null | undefined>;
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.authState = res.user;
        this.setUserStatus('online');
        this.router.navigate(['chat']);
      });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user.user;
        const status = 'online';
        this.setUserDate(email, displayName, status);
      }).catch(error => console.log(error));
  }

  setUserDate(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email,
      displayName,
      status,
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }

  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      status,
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }





}
