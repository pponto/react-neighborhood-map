import React, {Component} from 'react';
import LocationItem from './LocationItem';

class LocationList extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      'locations': '',
      'query': '',
      'suggestions': true,
    };

    this.filterLocations = this.filterLocations.bind(this);
    this.toggleSuggestions = this.toggleSuggestions.bind(this);
  }

  /**
   * Filter Locations
   */
  filterLocations(event) {
    this.props.closeInfoWindow();
    const {value} = event.target;
    var locations = [];

    this.props.allLocations.forEach(function(location) {
      if(location.longName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
      location.marker.setVisible(true);
      locations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
      'locations': locations,
      'query': value
    });
  }

  componentWillMount() {
    this.setState({
      'locations': this.props.allLocations
    });
  }

  /**
   * Suggestions Show and Hide
   */
  toggleSuggestions() {
    this.setState({
      'suggestions': !this.state.suggestions
    });
  }

  /**
   * Render function
   */
  render() {
    var LocationList = this.state.locations.map(function(listItem) {
      return (
        <LocationItem openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem} />
      );
    }, this);

    return (
      <div className="search">
        <input role="search" aria-label="search filter" id="search-field" type="text" placeholder="Type to Filter" value={this.state.query} onChange={this.filterLocations}></input>
        <ul>
          {this.state.suggestions && LocationList}
        </ul>
        <button className="button" onClick={this.toggleSuggestions}>Show/Hide</button>
      </div>
    );
  }
}

export default LocationList;