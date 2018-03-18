import { Component, OnInit, Inject } from '@angular/core';
// this component is a wrapper of ACE editor

import {ActivatedRoute, Params} from '@angular/router';

// need to declare ace as global variable
declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java';

  sessionId: string;  // socket session/group id, server side needs this

  modeFile = {
    'Java': 'java',
    'C++': 'c_cpp',
    'Python': 'python'
  }

  // default solution content
  defaultContent = {
    'Java': `public class Solution {
    public static void main(String[] args) {
      // write your code here
    }
}`,
    'C++': `#include <iostream>;
using namespace std;

int main() {
  // wrtie your code here
  return 0;
}`,
    'Python': `class Solution:
  def solution():
    # write your code here
  `
  }

  constructor(
    @Inject('collaboration') private collaboration,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        // socket session/group id, server side needs this
        this.sessionId = params['id']; // here, problem id is session id...
        this.initEditor();
      });
  }

  initEditor() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;

    // put cursor
    document.getElementsByTagName('textarea')[0].focus();

    this.collaboration.init(this.editor, this.sessionId);

    // editor's property, for receiving server's change of editor's content
    this.editor.lastAppliedChange = null;

    this.editor.on('change', (e) => {
      // when I type on the editor in browser, this code will process the change
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        // avoid 'glitches', only when my last change and current are different, send the change to others
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }

  setLanguage(language: string): void {
    this.language = language;
    console.log('reseting editor');
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode('ace/mode/' + this.modeFile[this.language]);
    this.editor.setValue(this.defaultContent[this.language]);
  }

  submit(): void {
    let userCode = this.editor.getValue();
    console.log(userCode);
  }
}
