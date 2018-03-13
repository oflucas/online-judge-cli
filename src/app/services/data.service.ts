import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import { PROBLEMS } from "../mock-problems";

// INjectable, can be used by others
@Injectable()
export class DataService {

  problems: Problem[] = PROBLEMS; // init from PROBLEMS at first

  constructor() { }

  getProblems(): Problem[] {
    return this.problems;
  }

  getProblem(id: number): Problem {
    return this.problems.find(
      (problem) => problem.id == id
    );
  }

  addProblem(problem: Problem): void {
    problem.id = this.problems.length + 1;
    this.problems.push(problem);
  }
}
