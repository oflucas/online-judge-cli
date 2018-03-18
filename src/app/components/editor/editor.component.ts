import { Component, OnInit, Inject } from '@angular/core';
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

  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java';

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

  constructor(@Inject('collaboration') private collaboration) {
  }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;

    this.collaboration.init();
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
