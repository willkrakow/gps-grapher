import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import styled from "styled-components";
import PropTypes from "prop-types";
import { netDistance, getTotalTime } from "../utils";
import Paper, { PaperTop } from "./Paper";


const GoogleMap = styled(GoogleMapReact)`
  height: 50vh;
  width: calc(1140px - 6em);
  display: block;
  margin: auto;
  flex: 0 0 400px;
`;

const GoogleMapWrapper = styled.div`
  height: 50vh;
  width: calc(100% + 6em);
  margin-left: -3em;
  margin-bottom: -3em;
  overflow: hidden;
  border-radius: 20px;
`;

const Map = ({ points, selectedPoint, handleClick, color }) => {
  //Center of google map component
  const center = {
    lat: getCenter(points, "lat"),
    lng: getCenter(points, "lon"),
  };


  const stylers = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8ec3b9",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#0e1626",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70",
        },
      ],
    },
  ];

  points.forEach((point) => {
    point.$.lat = parseFloat(point.$.lat);
    point.$.lng = parseFloat(point.$.lon);
  });

  //Find average of all points along an axis (latitudes or longitudes)
  function getCenter(data, axis) {
    //Convert datapoint values to float
    let arr = data.map((point, i) => parseFloat(point.$[axis]));
    const mean = arr.reduce((e, c) => e + c) / arr.length;
    return mean;
  }


  function createMapOptions(map) {
      return {
        styles: stylers,
      };
      
  }

return (
    <Paper color={color}>
      <PaperTop color={color} header="Route" infoText={[`Distance: ${netDistance(points)} km.`, `Time: ${getTotalTime(points)}`]} />
      <GoogleMapWrapper>
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          }}
          defaultCenter={center}
          defaultZoom={15}
          options={createMapOptions}
        >
          {points.map((point, index) => (
            <LocationPin
              index={index}
              lat={point.$.lat}
              lng={point.$.lon}
              key={index}
              isSelected={index === selectedPoint}
              clickHandler={handleClick}
            />
          ))}
        </GoogleMap>
      </GoogleMapWrapper>
    </Paper>
  )
};

Map.propTypes = {
  zoom: PropTypes.number,
  points: PropTypes.array,
  handleClick: PropTypes.func,
};

export default Map;
