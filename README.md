# React Map Neighborhood

This is a single-page web app developed for the frontend-nanodegree course of Udacity. Built using the React framework, that displays a Google Map of an area and various points of interest. This includes making function calls to Google Maps and other location-based services like Foursquare.

## Features

1. Click on any marker to see the location details fetched from the [FourSquare APIs](https://developer.foursquare.com/)
2. Type into the filter/search box to filter the shown locations on the map
3. Click anywhere on the map to close the information window that opens
4. Click on the button below the filter/search box to collapse or expand the suggestions list

## Installing

Project made by [Create-React-App starter code](https://github.com/facebookincubator/create-react-app)

Follow these steps:

1. Clone this repository to your computer
2. Install all the dependencies with `npm install`
3. Launch the app with this command `npm start`

The app will launch in your browser at the address[http://localhost:3000/](http://localhost:3000/).

***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*

## Running in Production Mode

You can run the build for testing the service worker following these steps

1 First `npm run build` to create an optimized version
2 Then `npm run deploy` to deploy to the specified address
