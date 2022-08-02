import ReactMapGL, { Marker, Popup} from 'react-map-gl'
import React from 'react'
import { useState } from 'react'
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({});
    

    //  transform seartch results into object into the { latitude: 52.516272, longitude: 13.377722 }

    const coordinates = searchResults.map((result) => ({
      longitude: result.long,
      latitude: result.lat,
    }));

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
      width: '100%',
      height: '100%',
      longitude: center.longitude,
      latitude: center.latitude,
      zoom: 12,
    });

    console.log(selectedLocation)

    return (
      <ReactMapGL
        mapStyle='mapbox://styles/so2f/cl6bgeair000b14oe5rpq960v'
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {searchResults.map(result => (
          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p
                role='img'
                onClick={() => setSelectedLocation(result)}
                className='cursor-pointer text-2xl animate-bounce'
                aria-label='push-pin'
              >📌</p>
            </Marker>

              {/* Popup onclick */}
              {selectedLocation.long === result.long ? (
                <Popup
                  onClose={() => setSelectedLocation({})}
                  closeOnClick={true}
                  latitude={result.lat}
                  longitude={result.long}
                >
                  {result.title}
                </Popup>
              ):(
                false
              )}

          </div>
        ))}

      </ReactMapGL>
    );
}

export default Map