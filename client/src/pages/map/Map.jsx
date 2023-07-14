import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
  useGoogleMap,
} from '@react-google-maps/api';
import markerIcon from './../../assets/icons8-map-pin-100.png';

// maps id : fee970aab1e85f53
// api: AIzaSyCVCAquIRKE59Ik6a-24sAc48n0DXsaEHo
// const marker = new Marker({
//   position: myLatLng,
//   map,
//   title: 'Hello World!',
// });

const Map = ({ setIsLoggedIn }) => {
  const [tempMarker, setTempMarker] = useState({});
  const [zoom, setZoom] = useState(14);
  const [center, setCenter] = useState({ lat: 48.866023, lng: 2.310071 });
  const [searchFriends, setSearchFriends] = useState('');
  const [newMarkerName, setnewMarkerName] = useState('');
  const [markers, setMarkers] = useState([]);

  //functions
  const onMapClick = (e) => {
    const position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    // const centerPosition = {
    //   lat: e.center.lat(),
    //   lng: e.center.lng(),
    // };

    setTempMarker(position);
    setCenter(position);
    // console.log(this.getZoom());
  };

  const addMarker = async () => {
    if (newMarkerName.length > 0) {
      try {
        const response = await fetch('/api/map/add', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newMarkerName,
            lat: center.lat,
            lng: center.lng,
          }),
        });

        //parse data
        const data = await response.json();

        console.log(data);
        console.log(data.sort((a, b) => a.title.localeCompare(b.title)));
        //sort data
        //set make updates wtih response
        setMarkers(data.sort((a, b) => a.title.localeCompare(b.title)));
        setnewMarkerName('');
      } catch (err) {}
    } else {
      console.log('require title');
    }
  };

  // fetch data when logged in immediately
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/map/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        //parse data
        const data = await response.json();

        console.log(data);
        console.log(data.sort((a, b) => a.title.localeCompare(b.title)));
        //sort data
        //set make updates wtih response
        setMarkers(data.sort((a, b) => a.title.localeCompare(b.title)));
      } catch (err) {}
    };

    fetchData();
  }, []);

  // dealing with Google Loader
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCVCAquIRKE59Ik6a-24sAc48n0DXsaEHo',
  });

  if (!isLoaded) return <div>Loading...</div>;
  console.log('map reloaded on each state');

  //render cards
  let cards = [];
  let pins = [];
  for (let i = 0; i < markers.length; i++) {
    cards.push(<MarkerComponent key={`map${i}`} info={markers[i]} />);
    pins.push(<MarkerPins key={`pin${i}`} x={markers[i].x} y={markers[i].y} />);
  }

  return (
    <div className="mapContainer">
      <div className="userInterface">
        <div className="userInterfaceDisplay">
          <div className="title" style={{ flex: 1, fontWeight: '600' }}>
            WELCOME USER
          </div>
          <button
            className="markerButton"
            style={{ fontWeight: '600', width: '100px' }}
            onClick={() => {
              setIsLoggedIn(false);
              console.log('Logged Out');
              navigate('/');
            }}
          >
            Log Out
          </button>
        </div>

        <div className="searchBar">
          <div className="title" style={{ fontWeight: '600' }}>
            Search Friends
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              className="input"
              type="text"
              value={searchFriends}
              onChange={(e) => setSearchFriends(e.target.value)}
            />
            <button className="markerButton">Search</button>
          </div>
        </div>

        <div className="newMarker">
          <div className="title" style={{ fontWeight: '600' }}>
            Add New Marker
          </div>
          <div>
            Y: {tempMarker.lat} | X: {tempMarker.lng}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              className="input"
              type="text"
              value={newMarkerName}
              onChange={(e) => setnewMarkerName(e.target.value)}
            />
            <button className="markerButton" onClick={addMarker}>
              Add
            </button>
          </div>
        </div>

        <div className="markerList">{cards}</div>
      </div>
      <GoogleMap
        zoom={zoom}
        center={center}
        // mapContainerStyle={mapStyles}
        mapContainerClassName="mapStyles"
        onClick={onMapClick}
        options={{
          disableDefaultUI: true,
          mapId: 'fee970aab1e85f53',
        }}
      >
        {/* <Marker position={{ lat: 48.866023, lng: 2.310071 }} /> */}
        <TempMarker position={tempMarker} />
        {pins}
      </GoogleMap>
    </div>
  );
};

const TempMarker = ({ position }) => {
  // on click market
  return <Marker position={position} />;
};

const MarkerPins = ({ x, y }) => {
  return (
    <Marker
      position={{ lat: y, lng: x }}
      icon={{
        url: markerIcon,
        scaledSize: new window.google.maps.Size(60, 60),
      }}
    />
  );
};

const MarkerComponent = ({ info }) => {
  // marker
  return (
    <div className="marker">
      <div className="subject">Destination:</div>
      <div className="title">{info.title}</div>

      <div className="subject"> Location:</div>
      <div>{info.address}</div>
      <div className="subject"> Info:</div>
      <div>{info.info}</div>
      <br></br>
      <div style={{ display: 'flex', gap: 5 }}>
        <button className="markerButton" style={{ flex: 2 }}>
          Expand
        </button>
        <button className="markerButton" style={{ flex: 1 }}>
          Share
        </button>
        <button className="markerButton" style={{ flex: 1 }}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default Map;

{
  /* <MarkerPins
coordinate={{ lat: 48.84900922713518, lng: 2.3502965856882563 }}
/> */
}
