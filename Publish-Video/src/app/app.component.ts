import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public androidPermissions: AndroidPermissions,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
        this.androidPermissions.PERMISSION.RECORD_AUDIO
     ])
    });
  }
}
