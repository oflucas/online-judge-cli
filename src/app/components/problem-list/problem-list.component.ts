import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";

// <*ngFor="let problem of problems">
// ~= for problem in problems


@Component({
  selector: 'app-problem-list',
  //template: +html content
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[]; // member data

  constructor(@Inject("data") private data) { }

  ngOnInit() {
    // this func will be run at init of ProblemListComponent
    this.getProblems();
  }

  getProblems(): void {
    this.problems = this.data.getProblems();
  }
}
