import {Component, Input, OnInit} from '@angular/core';
import { ChatMessage } from "../../models/chat-message.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message!: ChatMessage;
  email: string | undefined;
  username: string | undefined;
  messageContent: string | undefined;
  timeStamp: string | undefined;
  isOwnMessage: boolean | undefined;
  ownEmail: string | undefined;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe((user: any) => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.email;
    });
  }

  ngOnInit(): void {
    this.messageContent = this.message.message
    this.timeStamp = this.message.timeStamp
    this.email = this.message.email
    this.username = this.message.username
  }

}
