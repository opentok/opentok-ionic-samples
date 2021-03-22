# OpenTok Ionic Samples

### In this repo, you'll find the following sample applications:

* ##### Basic Video Chat
  * This sample application shows how to connect to an OpenTok session, publish a stream, and subscribe to a **single stream** in an iOS and Android application.

## Prerequisites:

1. Node.js

2. Ionic: `$ npm install -g ionic`

3. Xcode

4. Android Studio

##### Note: Please make sure to run the commands in the same order as below

1. Clone this repo

2. Change directory to the sample project

3. Run: `$ npm install`

4. Add the  android plateform.

5. Add Ionic cordova plugin cordova-plugin-android-permission,cordova-plugin-camera,cordova-plugin-media-capture (add in           config.xml)

6. Add below User permission in plateform/android/app/src/main/AndroidManifest.xml
 ```
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA" />
  ```

7. Install native plugin '@opentok/client','@ionic-native/camera','@ionic-native/android-permissions'
 ```
   npm install @opentok/client
   npm install @ionic-native/camera
   npm install @ionic-native/android-permissions
  ```
8. Request the permission for accessiog  CAMERA, AUDIO  when plateform is ready.


## Running the application

#### For Android

1. In the root directory of the sample project, run `ionic serve`.
    * This is needed to copy over the files to the `www` folder
2. Next, run `ionic cordova prepare android`.
3. Open Android Studio.
4. Click `Open an existing Android Studio project`.
5. Navigate to the `platforms/android` subdirectory of this project and select the `build.gradle` file.
6. Click run.

##### Note: If you're using the simulator, you will see a black container for your publisher since the simulator doesn't have a camera.

#### For iOS

##### Camera & Microphone Permissions

Add the following to the project's `info.plist` file:
 ```
 <key>NSCameraUsageDescription</key>
 <string>The camera is required to publish video</string>
 <key>NSMicrophoneUsageDescription</key>
 <string>The microphone is required to publish audio</string>
 ```
1. In the root directory of the sample project, run `ionic serve`.
    * This is needed to copy over the files to the `www` folder 
2. Next, run `ionic cordova prepare ios`.
3. Open Xcode.
4. Click `Open another project...`
5. Navigate to the `platforms/ios` subdirectory of this project and select `MyApp.xcodeproj`.
6. Sign the project.
7. Run.

##### Note: If you're using the simulator, you will see a simulation for your publisher since the simulator doesn't have a camera.

## Development and Contributing

Interested in contributing? We :heart: pull requests! See the 
[Contribution](CONTRIBUTING.md) guidelines.

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the project, let us know! You can either:

- Open an issue on this repository
- See <https://support.tokbox.com/> for support options
- Tweet at us! We're [@VonageDev](https://twitter.com/VonageDev) on Twitter
- Or [join the Vonage Developer Community Slack](https://developer.nexmo.com/community/slack)

## Further Reading

- Check out the Developer Documentation at <https://tokbox.com/developer/>