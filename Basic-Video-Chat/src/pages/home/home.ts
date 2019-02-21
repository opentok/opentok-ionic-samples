import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var OT:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  session: any;
  publisher: any;
  apiKey: any;
  sessionId: string;
  token: string;

  constructor(public navCtrl: NavController) {
    this.apiKey = '';
    this.sessionId = '';
    this.token = '';
  }

  startCall() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    this.publisher = OT.initPublisher('publisher');

    this.session.on({
      streamCreated: (event: any) => {
        this.session.subscribe(event.stream, 'subscriber');
        OT.updateViews();
      },
      streamDestroyed: (event: any) => {
        console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
        OT.updateViews();        
      },
      sessionConnected: (event: any) => {
        this.session.publish(this.publisher);
      }
    });

    this.session.connect(this.token, (error: any) => {
      if (error) {
        console.log(`There was an error connecting to the session ${error}`);
      }
    });
  }

}
