import { Component, OnInit } from '@angular/core';
import * as OT from '@opentok/client';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 session:any;
 apiKey:any;
 sessionId:any;
 token:any;
  constructor() {
  
  }
   ngOnInit(){
    this.apiKey="";
    this.sessionId="";
    this.token="";
    this.initializeOTSession();
   }
  initializeOTSession() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    this.startSession(this.session);
    
  }
  startSession(session) {
     session.connect(this.token, (error: any) => {
      if (error) {
        if (error.name === "OT_NOT_CONNECTED") {
         console.log("You are not connected to the internet. Check your network connection.", 'danger');
        }
        console.log("Error in connecting OT", error);
      }
      else {
         this.initializePublisher();
      }
    });
  }
  initializePublisher() {
    let publisherOptions = {
     publishAudio: true,
      publishVideo: true,
      name: "videoCam"
   };
    var publisher = OT.initPublisher("publisherElement", publisherOptions, (error) => {
      if (error) {
        console.log("Webcam Publisher ERROR.", error);
     
      } else {
        console.log("Webcam Publisher initialized.");
       }
    }
    );
  }

}
