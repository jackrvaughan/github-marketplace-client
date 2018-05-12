import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { Subscription } from 'rxjs';

const listingQuery = gql `
  query Feed($slug: String!) {
    marketplaceListing(slug: $slug) {
      name
      fullDescription
      extendedDescription
      logoBackgroundColor
      logoUrl
      primaryCategory {
        name
        description
      }
      secondaryCategory {
        name
        description
      }
      screenshotUrls
      supportUrl
      termsOfServiceUrl
    }
  }
`;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, OnDestroy {

  private feedRef: QueryRef<any>;
  private feedSub: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.feedRef = this.apollo.watchQuery<any>({
      query: listingQuery,
      variables: {
        slug: 'codecov'
      },
    });

    this.feedSub = this.feedRef
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.feedSub.unsubscribe();
  }

}
