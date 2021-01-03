import React from "react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import styled from "styled-components";
import PropTypes from "prop-types";


const PinIcon = styled(Icon).attrs((props) => ({
  icon: locationIcon,
  className: `text-${props.isselected ? "success" : "primary"}`,
}))`
  position: relative;
  top: ${props => props.isselected ? "-30px" : "0"};
`;

const LocationPin = ({ text, index, clickHandler, isSelected }) => (
  <div className="pin" onClick={() => clickHandler(index)}>
    <PinIcon
      isselected={isSelected ? "true" : undefined}
      width={`${isSelected ? "45px" : "15px"}`}
      height={`${isSelected ? "45px" : "15px"}`}
    />
    <p className="pin-text">{text}</p>
  </div>
);

export default LocationPin;

LocationPin.propTypes = {
  text: PropTypes.string,
  index: PropTypes.number,
  clickHandler: PropTypes.func,
  isSelected: PropTypes.bool,
};
