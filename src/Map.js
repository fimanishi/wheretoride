import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import {default as FaSpinner} from "react-icons/lib/fa/spinner";
import _ from "lodash";
import Helmet from "react-helmet";
import "./Map.css";
import axios from "axios"




// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// then wraps it into `withScriptjs` HOC
// It loads Google Maps JavaScript API v3 for you asynchronously.
// Name the component AsyncGettingStartedExampleGoogleMap
const AsyncGoogleMap = withScriptjs(
  withGoogleMap(
    props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={13}
        defaultCenter={props.center}
        onClick={props.onMapClick}
      >
        {props.markers.map((marker, index) => (
          <Marker key={index}
            {...marker}
            onClick={() => props.onMarkerClick(marker.position)}
          />
        ))}
        <Polyline
          {...props.polylines}
        />
      </GoogleMap>
    )
  )
);
// Then, render it:

export default class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      polylines: {
        path: [],
        options: {
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2}
      },
    };
    var data = {place: props.place};
    var base_url = process.env.PUBLIC_URL || 'http://localhost:8000';
    axios.post(base_url + "/api/coords", data)
      .then((result) =>
        this.setState({
          markers: result.data.markers,
          polylines: {
            path: result.data.coords,
            options: {
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2}
          }
        })
      )
      .catch((error) =>
        console.log(error)
      )
      console.log(props.center);
      console.log(props.place);
  }

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  }

  handleMarkerClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    console.log(targetMarker);
  }

  render() {
    return (
      <div className="mapSize">
        <Helmet
          title="Map"
        />
        <AsyncGoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCY0-PU1_-1lGKuQyJNuFWKBrA_LPM2bYw"
          loadingElement={
            <div style={{ height: `100%` }}>
              <FaSpinner
                style={{
                  display: `block`,
                  width: `80px`,
                  height: `80px`,
                  margin: `150px auto`,
                  animation: `fa-spin 2s infinite linear`,
                }}
              />
            </div>
          }
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={_.noop}
          onMapClick={_.noop}
          markers={this.state.markers}
          polylines={this.state.polylines}
          onMarkerClick={this.handleMarkerClick}
          center={this.props.center}
        />
      </div>
    );
  }
}
