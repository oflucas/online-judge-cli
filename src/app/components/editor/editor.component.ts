import { Component, OnInit } from '@angular/core';
// this component is a wrapper of ACE editor

// need to declare ace as global variable
declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  // default solution content
  defaultContent = {
    'Java': `public class Solution {
    public static void main(String[] args) {
      // write your code here
    }
}`
  }

  constructor() {
  }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.getSession().setMode('ace/mode/java');
    this.editor.setValue(this.defaultContent["Java"]);
  }

}
