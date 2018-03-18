import { Injectable } from '@angular/core';

// use variable in third party lib
declare var io: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor:any, sessionId: string): void {
    // send something
    this.collaborationSocket = io(
      window.location.origin, // socket link target url, window.location.origin == F/E's url
      {query: 'sessionId=' + sessionId}  // for handshake
    );

    // receive server's change
    this.collaborationSocket.on('change', (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }

  change(delta: string) {
    this.collaborationSocket.emit('change', delta);
  }
}
