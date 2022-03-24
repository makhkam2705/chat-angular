import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {ChatroomComponent} from "./components/chatroom/chatroom.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {FeedComponent} from "./components/feed/feed.component";

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'chat', component: ChatroomComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
