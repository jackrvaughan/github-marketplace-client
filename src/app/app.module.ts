import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// third party modules
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './shared/nav/nav.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { FilterComponent } from './filter/filter.component';
import { ListingComponent } from './listing/listing.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'app/:id', component: ListingComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    MarketplaceComponent,
    FilterComponent,
    ListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({uri: 'https://api.github.com/graphql'});
    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      // const token = localStorage.getItem('token');
      const token = '571e78406e08a4c0866c686a1862df729b195d83';
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: {
            Authorization: `Bearer ${token}`
          }
          // headers: headers.append('Authorization', `Bearer ${token}`)
        };
      }
    });

    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });
  }
}


