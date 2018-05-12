import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { Subscription } from 'rxjs';

const listings = gql `
  query {
    marketplaceCategories(excludeEmpty:true) {
      name
    }
  }
`;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  private feedRef: QueryRef<any>;
  private feedSub: Subscription;

  private categories = [];
  private allSelected = true;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.feedRef = this.apollo.watchQuery<any>({
      query: listings
    });

    this.feedSub = this.feedRef
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);
        this.categories = data.marketplaceCategories.map(item => {
          // set selected for all to true
          return Object.assign({}, item, {selected: true});
        });
      });
  }

  allSelectedToggle() {
    this.allSelected = this.allSelected ? false : true;
    if (this.allSelected) {
      this.categories.forEach(category => {
        category.selected = true;
      });
    } else {
      this.categories.forEach(category => {
        category.selected = false;
      });
    }
    this.filter();
  }

  filter() {
    console.log(this.categories);
  }

}
