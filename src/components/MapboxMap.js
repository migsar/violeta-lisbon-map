import React, { useState } from 'react';
import ReactMapGL, { Layer, Marker, Source } from 'react-map-gl';

import PostMarker from './PostMarker';
import data from './MapboxMap.data.json';
import styles from './MapboxMap.module.css';

const initialViewport = {
  width: '100%',
  height: '100%',
  latitude: 38.736928,
  longitude: -9.128391,
  zoom: 12.09
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 3,
    'circle-color': '#007cbf'
  }
};

const markerMap = post => <PostMarker {...post} />;

function MapboxMap() {
  const [viewport, setViewport] = useState(initialViewport);
  const postPoints = data.features.map(({ geometry, properties }) => {
    const [ longitude, latitude ] = geometry.coordinates;
    const { link, author, location: { text } } = properties;
    const key = link.match(/\/([^/]*)\/$/)[1];
    return {
      key,
      longitude,
      latitude,
      postId: key,
      author,
      title: text,
    };
  });

  return (
    <div className={styles.mapboxMap}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoibWlnc2FyIiwiYSI6ImNrYjFxYW13cTBmOGEzMm1pb2tiMWNmMzIifQ.6ua7v3C1bWAxR4_Z2vIjvA"
        mapStyle="mapbox://styles/migsar/ckmj6wlkg4ce417mff5il07sy"
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        {postPoints.map(markerMap)}
        <Source id='posts' type="geojson" data={data}>
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGL>
    </div>
  )
}

export default MapboxMap
