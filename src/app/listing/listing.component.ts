import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { Subscription } from 'rxjs';

const listingQuery = gql `
  query Feed($slug: String!) {
    marketplaceListing(slug: $slug) {
      name
      fullDescription
      extendedDescriptionHTML
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

  private routerSub: Subscription;

  private feedRef: QueryRef<any>;
  private feedSub: Subscription;

  private listing: object;
  private screenshot: string;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      const slug = params['slug'];

      this.feedRef = this.apollo.watchQuery<any>({
        query: listingQuery,
        variables: {
          slug: slug
        },
      });
      this.feedSub = this.feedRef
        .valueChanges
        .subscribe(({ data, loading }) => {
          console.log(data);
          this.listing = data.marketplaceListing;
          this.screenshot = data.marketplaceListing.screenshotUrls[0];
        });
   });
  }

  setScreenshot(screenshot) {
    this.screenshot = screenshot;
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.feedSub.unsubscribe();
  }

}
