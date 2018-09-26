import React, { Component } from 'react';
import LocationList from './LocationList';

class App extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      allLocations: require("./locations.json"), // Get locations
      map: '',
      infoWindow: '',
      prevMarker: ''
    };

    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    // Connect the initMap() function within this class to global context and Google Maps can invoke
    window.initMap = this.initMap;
    // Asynchroniusly load Google Maps script and pass the callback
    loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBaps43pv2WKcxMQ0vyIOgb0Fbb0ijTr5k&callback=initMap')
  }

  /**
   * Initialise the map
   */
  initMap() {
    const self = this;

    const mapview = document.getElementById('map');
    mapview.style.height = window.innerHeight + "px";
    const map = new window.google.maps.Map(mapview, {
      center: {lat: -8.034825999999999, lng: -34.9194623},
      zoom: 15,
      mapTypeControl: false
    });

    const InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, 'closeclick', function() {
      self.closeInfoWindow();
    });

    this.setState({
      'map': map,
      'infoWindow': InfoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", function() {
      const center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, 'click', function() {
      self.closeInfoWindow();
    });

    var allLocations = [];

    this.state.allLocations.forEach(function(location) {
      const longName = location.name + ' - ' + location.type;
      const key = location.id;
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.latitude, location.longitude),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      marker.addListener('click', function() {
        self.openInfoWindow(marker);
      });

      location.key = key;
      location.longName = longName;
      location.marker = marker;
      location.display = true;
      allLocations.push(location);
    });

    this.setState({
      'allLocations': allLocations
    });
  }

  /**
   * Open the infoWindow
   */
  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infoWindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);

    this.setState({
      'prevMarker': marker
    });

    this.state.infoWindow.setContent('Loading Data...');
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.getMarkerInfo(marker);
  }

  /**
   * Get location data from Foursquare api
   */
  getMarkerInfo(marker) {
    const self = this;
    const clientId = "PP25IA234YM1R5MPINHWE1ROH5PMSDYFP2WDD5OHET44O4JC";
    const clientSecret = "HCGD1XFB024RXOXIC1X02DU2IBJO05EH213W5FEOSTQNGVAS";
    var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
    fetch(url)
      .then(
        function(response) {
          if(response.status !== 200) {
            self.state.infoWindow.setContent("Data can't be loaded");
            return;
          }

          // Verify the text response
          response.json().then(function(data) {            
            var location_data = data.response.venues[0];
            var place = '<h3>' + location_data.name + '</h3>';
            var street = '<p>' + location_data.location.formattedAddress[0] + '</p>';
            var verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
            var tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
            var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare</a>';
            self.state.infoWindow.setContent(place + street + tipCount + verified + readMore);
          });
        }
      )
      .catch(function(err) {
        self.state.infoWindow.setContent("Data can't be loaded: " + err);
      });
  }

  /**
   * Close the infoWindow
   */
  closeInfoWindow() {
    if(this.state.prevMarker) {
      this.state.prevMarker.setAnimation(null);
    }
    this.setState({
      'prevMarker': ''
    });
    this.state.infoWindow.close();
  }

  /**
   * Render function
   */
  render() {
    return (
    <div>
      <LocationList key="100" allLocations={this.state.allLocations} openInfoWindow={this.openInfoWindow} closeInfoWindow={this.closeInfoWindow} />
      <div id="map"></div>
    </div>
    );
  }

}

export default App;

/**
 * Load Google Maps Assynchronously
 */
function loadMapJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");

  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Google Maps can't be loaded");
  };
  ref.parentNode.insertBefore(script, ref);
}