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

4. Add the [Cordova-OpenTok-Plugin](https://github.com/msach22/cordova-plugin-opentok): 
`$ ionic cordova plugin add https://github.com/msach22/cordova-plugin-opentok/`

## Configuring the application

Before running the application, you need to configure it to use the API key for your OpenTok project, along with an OpenTok session ID and token. For test purposes, you can get a test session ID and token for your project at your TokBox account page.

Open the `src/pages/home/home.ts` file in your project and set the `apiKey`, `sessionId`, and `token` values to the API key, session ID, and token:
```
    // Set Credentials
    this.apiKey = '';    // Add your API key.
    this.sessionId = ''; // Add the session ID.
    this.token = '';     // Add the token.
```
An OpenTok session connects different clients letting them share audio-video streams and send messages. Clients in the same session can include iOS, Android, and web browsers.

For testing, you can use a session ID and token generated at your TokBox account page. However, the final application should obtain these values using the OpenTok server SDKs. For more information, see the OpenTok developer guides on session creation and token creation.

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

1. In the root directory of the sample project, run `ionic serve`.
    * This is needed to copy over the files to the `www` folder 
2. Next, run `ionic cordova prepare android`.
3. Open Xcode.
4. Click `Open another project...`
5. Navigate to the `platforms/ios` subdirectory of this project and select `MyApp.xcodeproj`.
6. Sign the project.
7. Run.

##### Note: If you're using the simulator, you will see a simulation for your publisher since the simulator doesn't have a camera.