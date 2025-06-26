import React, {useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaSearch } from "react-icons/fa";

// ✅ Create a custom icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const FlyToLocation = ({ coordinates }) => {
  const map = useMap();

  React.useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 10); // zoom level 10
    }
  }, [coordinates, map]);

  return null;
};
const LocationMap = ({ serviceCenters }) => {
  const position = [23.8103, 90.4125]; // Dhaka, Bangladesh

  const [searchText, setSearchText] = useState("");
  const [targetCoords, setTargetCoords] = useState(null); 

  const handleSearch = (e) => {
    e.preventDefault();

        const match = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (match) {
      setTargetCoords([match.latitude, match.longitude]);
    } else {
      alert("District not found");
    }
 
  };

  return (
    <div className="my-8 rounded-lg overflow-hidden shadow-lg">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <form onSubmit={handleSearch}>
          <div className="form-control w-full max-w-md">
            <div className="input-group flex">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search here"
                className="input input-bordered w-full"
              />
              <button className="btn btn-success text-white px-6">
                <FaSearch />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* mapcontainer */}
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}

      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        />
        {serviceCenters.map((center, index) => (
          <Marker
            key={index}
            position={[center.latitude, center.longitude]}
            icon={customIcon}
          >
            <Popup>
              We are located in <strong>{center.district}</strong>.
            </Popup>
          </Marker>
        ))}
         <FlyToLocation coordinates={targetCoords} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
