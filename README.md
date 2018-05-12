# Github Marketplace Client

A simple web app to explore Github Marketplace apps

## Setup

In order to run the app, you must add your own Github Personal Access Token with the Repo scope enabled. You will find an example environment file at `/src/environments/environment.example.ts`:

```
export const environment = {
    production: false,
    token: '*** Github Personal access token ***'
};
```

Modify that file with your own personal access token and save it as `/src/environments/environment.ts`. Once that is complete, you can build or serve the angular app. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Architecture

The client app is split into...
