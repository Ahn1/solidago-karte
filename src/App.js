import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {LatLngBounds} from 'leaflet'
import licon from 'leaflet/dist/images/marker-icon.png'
import liconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet'

import './App.css';
import 'leaflet/dist/leaflet.css'

var myIcon = L.icon({
  iconUrl: licon,
  shadowUrl: liconShadow,
  iconSize: [
    25, 41
  ],
  iconAnchor: [
    12, 41
  ],
  popupAnchor: [
    1, -34
  ],
  tooltipAnchor: [
    16, -28
  ],
  shadowSize: [41, 41]
});

const tilemaps = {
  aquarel: "http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
  default: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
  alernate: "http://a.tile.osm.org/{z}/{x}/{y}.png",
  light: "http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
}

function getParameterByName(name, url) {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const tilemap = tilemaps.default;

function setTile() {
  const map = getParameterByName("tilemap");
  if (tilemaps[map]) {
    tilemap = tilemaps[map];
  }
};
setTile();

const community = (lat, long, name) => {
  return {
    name,
    position: [lat, long]
  }
}

let communities = [
  community(52.510546, 13.385364, "Solidago weissensee"),
  community(52.530546, 13.470364, "Berolina"),
  community(48.156776, 11.591655, "Name der Gemeinschaft")
];

class App extends Component {
  render() {
    return (
      <div style={{
        height: "100%",
        width: "100%"
      }}>
        <Map center={[50.996221, 10.400731]} zoom={7}>
          <TileLayer url={tilemap} attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/> {communities.map(c => <Marker position={c.position} key={c.name} icon={myIcon}>
            <Popup>
              <span>{c.name}</span>
            </Popup>
          </Marker>)}

        </Map>

      </div>
    );
  }
}

export default App;
