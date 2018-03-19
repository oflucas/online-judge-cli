import { Injectable } from '@angular/core';
import { COLORS } from '../../assets/colors'; // cursor colors

// use variable in third party lib
declare var io: any;
declare var ace: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  // state info of users (or clients) in the same editing session
  clientsInfo: Object = {};
  clientNum: number = 0;

  constructor() { }

  init(editor:any, sessionId: string): void {
    // send something
    this.collaborationSocket = io(
      window.location.origin, // socket link target url, window.location.origin == F/E's url
      {query: 'sessionId=' + sessionId}  // for handshake
    );

    // receive server's code change
    this.collaborationSocket.on('change', (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    // receive server's cursor change
    this.collaborationSocket.on('cursorMove', (cursor) => {
      console.log('cursor move: ' + cursor);
      let session = editor.getSession();
      cursor = JSON.parse(cursor);
      let x = cursor['row'];
      let y = cursor['column'];
      // to know whose cursor changes, we insert a 'socketId' key in the map
      let changeClientId = cursor['socketId'];
      console.log(x + ' ' + y + ' ' + changeClientId);

      // here we use marker, which is a range (or selection) of cursor
      // to update a marker, we delete old and then add new.
      if (changeClientId in this.clientsInfo) {
        session.removeMarker(this.clientsInfo[changeClientId]['marker']);
      } else {
        // new comer
        this.clientsInfo[changeClientId] = {};
        // css style of marker
        let css = document.createElement('style');
        css.type = "text/css";
        css.innerHTML = ".editor_cursor_" + changeClientId
          + " { position: absolute; background: " + COLORS[this.clientNum] + ";"
          + " z-index: 100; width: 3px !important; }";

        // append this css to html
        document.body.appendChild(css);
        this.clientNum++;
      }

      // new marker
      let Range = ace.require('ace/range').Range;
      let newMarker = session.addMarker(
        new Range(x, y, x, y + 1),
        // pass class name, CSS style we added can recognize
        'editor_cursor_' + changeClientId,
        true
      );
      this.clientsInfo[changeClientId]['marker'] = newMarker;
    });
  }

  change(delta: string) {
    this.collaborationSocket.emit('change', delta);
  }

  cursorMove(cursor: string) {
    this.collaborationSocket.emit('cursorMove', cursor);
  }

  restoreBuffer(): void {
    this.collaborationSocket.emit('restoreBuffer');
  }
}
