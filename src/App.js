import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngBounds } from 'leaflet'

import './App.css';
import 'leaflet/dist/leaflet.css'

let position = [52.510546, 13.385364];

const community = (lat, long, name) => {
  return {name, position: [lat, long]}
}

let communities = [
  community(52.510546, 13.385364, "Solidago weissensee"),
  community(52.514546, 13.389364, "Berolina")
];


class App extends Component {
  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        <Map center={position} zoom={13} maxBounds={[[54.986161, 5.706812], [47.403148, 14.791613]]}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {communities.map(c =>

            <Marker position={c.position}>
              <Popup>
                <span>{c.name}</span>
              </Popup>
            </Marker>


          ) }

        </Map>


      </div>
    );
  }
}

export default App;
