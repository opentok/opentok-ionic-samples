## Exploring the code

#### Connecting to the session

The `OT.initSession()` method initialized an OpenTok Session object, using the session ID and token (see [Configuring the application](https://github.com/opentok/opentok-ionic-samples#configuring-the-application)):
```
  // Initialize Session Object
  this.session = OT.initSession(apiKey, sessionId);
```
The `OT.initSession()` method takes two parameters -- the OpenTok API key and the session ID. It initializes and returns an OpenTok Session object.

The `connect()` method of the Session object connects the client application to the OpenTok session. You must connect before sending or receiving audio-video streams in the session (or before interacting with the session in any way). The `connect()` method takes two parameters -- a token and an optional completion handler function:
```
    // Connect to the Session
    this.session.connect(token, () => {
      
      // publish to the session
    });
```
The Session object dispatches a `streamDestroyed` event when the stream is destroyed. The application defines an event handler for this event:
```
  session.on({
    streamDestroyed: (event) => {
      console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
    }
  });
```
#### Publishing an audio video stream to the session

Upon successfully connecting to the OpenTok session (see the previous section), the application initializes an OpenTok Publisher object and publishes an audio-video stream to the session. This is done inside the completion handler for the `connect()` method, since you should only publish to the session once you are connected to it.

The Publisher object is initialized as shown below. The `OT.initPublisher()` method takes two parameters:

The target DOM element or DOM element ID for placement of the publisher video

A set of publisher properties (optional)
```
  this.publisher = OT.initPublisher('publisher');
```
Once the Publisher object is initialized, we publish to the session using the `publish()` method of the Session object:
```
  this.session.publish(this.publisher);
```
#### Subscribing to another client's audio-video stream

The Session object dispatches a `streamCreated` event when a new stream (other than your own) is created in a session. A stream is created when a client publishes to the session. The `streamCreated` event is also dispatched for each existing stream in the session when you first connect. This event is defined by the StreamEvent object, which has a `stream` property, representing stream that was created. The application adds an event listener for the streamCreated event and subscribes to all streams created in the session using the `session.subscribe()` method:
```
    // Subscribe to a newly created stream
    this.session.on({
      streamCreated: (event) => {
        session.subscribe(event.stream, 'subscriber');
      }
    });
```
The `session.subscribe()` method takes four parameters:

The Stream object to which we are subscribing to
The target DOM element or DOM element ID (optional) for placement of the subscriber video
A set of properties (optional) that customize the appearance of the subscriber view
An optional completion handler.

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