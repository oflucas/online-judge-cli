import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class InputService {
  // this service enable communication between two components

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
