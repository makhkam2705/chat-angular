import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import firebase from "firebase/compat/app";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: Observable<firebase.User>;
  userEmail!: string | null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authUser().subscribe((data: any) => {
      this.user = data;
      if (this.user) {
        this.userEmail = data.email;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
