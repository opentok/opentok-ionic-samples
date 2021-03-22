import { Component, OnInit } from '@angular/core';
import * as OT from '@opentok/client';
import { fabric } from 'fabric';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  fabricCanvas: any;
  session: any;
  apiKey: any;
  sessionId: any;
  token: any;

  constructor() { }
  ngOnInit() {
    this.apiKey = "46255932";
    this.sessionId = "2_MX40NjI1NTkzMn5-MTU3NDg1ODI0NjE1OH5DN1k5WmMzd3NFeTQ4c3F5TnNWZ3htQkR-fg";
    this.token = "T1==cGFydG5lcl9pZD00NjI1NTkzMiZzaWc9OTBkZTE1OTFhNDM2OGYwN2VmMjE5MjkzMjA5N2U4Zjk3Mzc4NGY0NjpzZXNzaW9uX2lkPTJfTVg0ME5qSTFOVGt6TW41LU1UVTNORGcxT0RJME5qRTFPSDVETjFrNVdtTXpkM05GZVRRNGMzRjVUbk5XWjNodFFrUi1mZyZjcmVhdGVfdGltZT0xNTc0ODU4MjcyJm5vbmNlPTAuMTk0MjA4Mzk4NzQ0NzM1MTcmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU3NzQ1MDI3MiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";
    this.initializeOTSession();
    this.fabricCanvas = new fabric.Canvas('WhiteboardCanvas');
    this.fabricCanvas.isDrawingMode = true;
    this.fabricCanvas.freeDrawingBrush.width = 3;
    this.fabricCanvas.freeDrawingBrush.color = "red";

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
    session.on('streamCreated', function (event) {
      var subscriberProperties = { insertMode: 'append' };
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
      captureStream(Rate): MediaStream;
    };
    const canvas = <CanvasElement>document.getElementById("WhiteboardCanvas");
    const publisher = OT.initPublisher('publisher', {
      videoSource: canvas.captureStream(1).getVideoTracks()[0]
    }, (err) => {
      if (err) {
        console.log('err.message: ', err.message);
      } else {
        console.log('"publish": ', "publish");
      }
    });

    session.publish(publisher, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Publishing a stream - success.');
      }
    });

  }

}
