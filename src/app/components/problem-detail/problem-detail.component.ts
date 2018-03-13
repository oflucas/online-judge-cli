import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem;

  constructor(private route: ActivatedRoute, @Inject("data") private data) { }

  ngOnInit() {
    // subscribe: run everytime when params(i.e., routed URL) changes
    this.route.params.subscribe(
      params => {
        this.problem = this.data.getProblem(+params["id"]) // + is string to number
          .then(problem => this.problem = problem);
      }
    )
  }

}
