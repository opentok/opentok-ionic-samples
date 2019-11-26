import { Component, OnInit } from '@angular/core';
import * as OT from '@opentok/client';
import { fabric } from 'fabric';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  fabricCanvas:any;
  session:any;
  apiKey:any;
  sessionId:any;
  token:any;
  
  constructor() {}
  ngOnInit(){
      this.apiKey="46153302";
    this.sessionId="2_MX40NjE1MzMwMn5-MTU3NDIzNjYyNTUwNH5Wa05DZVFtVHNWRlNLQkM3R0UydW9iRTd-fg";
    this.token="T1==cGFydG5lcl9pZD00NjE1MzMwMiZzaWc9ODg4N2U5ZmZkZTVlOGQzOTM5ZDZkYmY1ZmU0ZmRiN2QxYmJkNjVhYTpzZXNzaW9uX2lkPTJfTVg0ME5qRTFNek13TW41LU1UVTNOREl6TmpZeU5UVXdOSDVXYTA1RFpWRnRWSE5XUmxOTFFrTTNSMFV5ZFc5aVJUZC1mZyZjcmVhdGVfdGltZT0xNTc0MjM2NjcxJm5vbmNlPTAuNzM3MjU0NjAxMTg5OTk2NSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTc2ODI4NjcwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
    this.initializeOTSession();
    this.fabricCanvas = new fabric.Canvas('WhiteboardCanvas');
    this.fabricCanvas.isDrawingMode = true;
    this.fabricCanvas.freeDrawingBrush.width =3;
    this.fabricCanvas.freeDrawingBrush.color ="red";
 
  }
  initializeOTSession() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    this.startSession(this.session);
    
  }
  startSession(session: any) {
  
    session.connect(this.token, (error: any) => {
      
      if (error) {
        if (error.name === "OT_NOT_CONNECTED") {
         console.log("You are not connected to the internet. Check your network connection.", 'danger');
        }
        console.log("Error in connecting OT", error);
      }
      else {
         this.initializePublisher(session);
      }
  });
  session.on('streamCreated', function(event) {
    var subscriberProperties = {insertMode: 'append'};
    var subscriber = session.subscribe(event.stream,
      'subscriberContainer',
      subscriberProperties,
      function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log('Subscriber added.');
        }
    });
  });

}
  initializePublisher(session) {
    interface CanvasElement extends HTMLCanvasElement {
      captureStream(Rate): any;
    };

   const canvas= <CanvasElement>document.getElementById('WhiteboardCanvas');
   const canvasStream=canvas.captureStream(15);
   console.log('canvasStream: ', canvasStream)
    let publisherOptions = {
         videoSource:canvasStream,      
          insertDefaultUI: false,
          publishAudio: false,
       name: "canvasStream"
    };
    console.log('publisherOptions: ', publisherOptions);
     var publisher = OT.initPublisher(null, publisherOptions, (error) => {
       
         if (error) {
         console.log("canvas Publisher ERROR.", error);
       } else {
         console.log('publisher: ', publisher);
         console.log("canvas Publisher initialized.");
        }
     }
     );
     session.publish(publisher, function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Publishing a stream.');
      }
    });
    
   }
 
}
