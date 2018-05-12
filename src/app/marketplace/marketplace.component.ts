import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { Subscription } from 'rxjs';

const listings = gql `
  query Feed($first: Int, $after: String) {
    marketplaceListings(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        name
        logoUrl
        logoBackgroundColor
        normalizedShortDescription
        fullDescription
        primaryCategory {
          name
          description
        }
        secondaryCategory {
          name
          description
        }
      }
    }
  }
`;

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit, OnDestroy {

  private feedRef: QueryRef<any>;
  private feedSub: Subscription;

  private filterCategories = [];
  private listings = [];
  private filteredListings = [];
  private pageInfo: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {

    this.feedRef = this.apollo.watchQuery<any>({
      query: listings,
      variables: {
        first: 20,
        after: null
      },
    });

    this.feedSub = this.feedRef
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);
        // this.loading = loading;
        this.pageInfo = data.marketplaceListings.pageInfo;
        this.listings = data.marketplaceListings.nodes;
        this.filter(this.filterCategories);
      });
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    // console.log($event);
    // console.log('scrolling');
  }

  loeadMore() {
    console.log('load more!');
    console.log('end cursor: ', this.pageInfo.endCursor);
    this.feedRef.fetchMore({
      variables: {
        first: 20,
        after: this.pageInfo.endCursor
      },
      updateQuery: (oldData, {fetchMoreResult}) => {
        console.log(oldData);
        console.log(fetchMoreResult);
        fetchMoreResult.marketplaceListings.nodes = [...oldData.marketplaceListings.nodes, ...fetchMoreResult.marketplaceListings.nodes];
        return fetchMoreResult;
      }
    });
  }

  filter(categories) {
    this.filterCategories = categories;
    if ( categories && categories.length > 0) {
      this.filteredListings = this.listings.filter(listing => {
        return categories.find(category => {
          if (listing.secondaryCategory) {
            return ([listing.primaryCategory.name, listing.secondaryCategory.name].indexOf(category.name) > -1);
          } else {
            return listing.primaryCategory.name === category.name;
          }
        });
      });
    } else {
      this.filteredListings = this.listings;
    }
    console.log(this.filteredListings);
    if (this.filteredListings.length < 20 && this.pageInfo.hasNextPage) {
      this.loeadMore();
    }
  }

  ngOnDestroy() {
    this.feedSub.unsubscribe();
  }

}
