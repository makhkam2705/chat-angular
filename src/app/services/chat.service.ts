import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  chatMessages: AngularFireList<ChatMessage> | undefined;
  chatMessage: ChatMessage | undefined;
  username: string | undefined;

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
      this.angularFireAuth.authState.subscribe(auth => {
        if (auth) {
          this.user = auth;
        }
        this.getUser().valueChanges().subscribe((value: any) => {
          this.username = value.displayName;
        });
      });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;

    return this.db.object(path);
  }

  getUsers() {
    const path = `/users`;
    return this.db.list(path);
  }

  sendMessage(message: string) {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message,
      timeStamp,
      username: this.username,
      email
    });

  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => ref.orderByKey().limitToLast(25));
  }

  getTimeStamp() {
    const now = new Date();
    const date = `${now.getUTCFullYear()}/${(now.getUTCMonth() + 1)}/${now.getUTCDate()}`;
    const time = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCDate()}`;
    return date + ' ' + time;
  }


}
