import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import {ChatMessage} from "../../models/chat-message.model";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: ChatMessage[] | undefined;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessages().valueChanges()
      .subscribe(res => {
        this.feed = res;
      });
  }

  ngOnChanges(): void {
    this.chatService.getMessages().valueChanges()
      .subscribe(res => {
        this.feed = res;
      });
  }

}
