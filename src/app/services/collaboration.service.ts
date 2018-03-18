import { Injectable } from '@angular/core';

// use variable in third party lib
declare var io: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(): void {
    // send something
    this.collaborationSocket = io(
      window.location.origin, // socket link target url, window.location.origin == F/E's url
      {query: 'message=123'}  // for handshake
    );

    // when receive something, create an event named "message"
    this.collaborationSocket.on("message", (message) => {
      console.log("received: " + message);
    });
  }

}
