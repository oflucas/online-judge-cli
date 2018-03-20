import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class InputService {

  private inputSubject$ = new BehaviorSubject<string>('');

  constructor() { }

  changeInput(term) {
    this.inputSubject$.next(term);
  }

  getInput(): Observable<string> {
    // don't give reference of inputSubject$ to others, give a observable
    return this.inputSubject$.asObservable();
  }
}
