import PropTypes from "prop-types";

export function clickHandler(elems, callback) {
  elems.length === 0 ? callback(null) : callback(elems[0]._index);
}

clickHandler.propTypes = {
  elems: PropTypes.array,
  callback: PropTypes.func,
};

clickHandler.defaultProps = {
  elems: [],
};

// export function useStylePoints(points, selectedPoint) {
//   const [styleArray, setStyleArray] = useState([]);
//   useEffect(() => {
//     try {
//       let arr = new Array(points.length).fill("#3498db");
//       if (!selectedPoint) {
//         setStyleArray(arr);

//       } else {
//         console.log(arr);
//         arr[selectedPoint] = "#60bf00";
//         setStyleArray(arr);
//       }
//     } catch (error) {
//       console.log(`${error.name}: ${error.message}`);
//     }
//     return styleArray
//   }, [points, selectedPoint]);
// }

// useStylePoints.propTypes = {
//   points: PropTypes.array,
//   selectedPoint: PropTypes.number,
// };

// useStylePoints.defaultProps = {
//   selectedPoint: null,
// };
