import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  email!: string;
  password!: string;
  displayName!: string;
  errorMsg!: string;

  constructor(private authService: AuthService, private router: Router) { }

  signUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService.signUp(email, password, displayName)
      .then((resolve: any) => this.router.navigate(['chat']))
      .catch((error: any) => this.errorMsg = error.message);
  }

}
