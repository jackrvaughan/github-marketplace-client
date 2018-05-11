import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Subscription } from 'rxjs';

// const CurrentUserForProfile = gql`
//   query {
//     viewer {
//       login
//     }
//   }
// `;

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  // private querySubscription: Subscription;

  constructor(apollo: Apollo) {
    // apollo.query({query: gql`{ hello }`}).subscribe(console.log);
  }
}
