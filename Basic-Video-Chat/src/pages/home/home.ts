import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var OT:any;
declare var Cordova: any;

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

    this.session.on({
      streamCreated: (event) => {
        this.session.subscribe(event.stream, 'subscriber');
      },
      streamDestroyed: (event) => {
        console.log(`Stream ${event.stream.name} ended because ${event.reason}`);        
      }
    });

    this.session.connect(this.token, () => {
      this.publisher = OT.initPublisher('publisher');
      this.session.publish(this.publisher);
    });
  }

}
