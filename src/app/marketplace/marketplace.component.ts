import { Component, OnInit } from '@angular/core';

import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.githubService.getUser();
  }

}
