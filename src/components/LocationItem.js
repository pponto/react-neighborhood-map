import React, {Component} from 'react';

class LocationItem extends Component {
  /**
   * Render Function
   */
  render() {
    return (
      <li key={this.props.data.key} role="button" className="box" tabIndex="0" onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)} onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>{this.props.data.longName}</li>
    );
  }
}

export default LocationItem;