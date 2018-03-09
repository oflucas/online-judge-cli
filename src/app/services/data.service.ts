import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import { PROBLEMS } from "../mock-problems";

// INjectable, can be used by others
@Injectable()
export class DataService {

  constructor() { }

  getProblems(): Problem[] {
    return PROBLEMS;
  }

  getProblem(id: number): Problem {
    return PROBLEMS.find(
      (problem) => problem.id == id
    );
  }
}
