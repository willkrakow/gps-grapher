import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";

export function distance(lon1, lat1, lon2, lat2) {
  //Add method to Number prototype to convert degrees to radians
  if (typeof Number.prototype.toRad === "undefined") {
    // eslint-disable-next-line
    Number.prototype.toRad = function () {
      return (this * Math.PI) / 180;
    };
  }

  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
  const dLon = (lon2 - lon1).toRad();
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) *
      Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

distance.propTypes = {
  lat1: PropTypes.number,
  lat2: PropTypes.number,
  lon1: PropTypes.number,
  lon2: PropTypes.number,
};

export function getTotalTime(points) {
  const endTime = new moment(_.last(points).time);
  const startTime = new moment(_.head(points).time);

  //Convert to utc for easier mat
  const duration = moment
    .utc(
      //  Find difference between start/end times
      moment(endTime, "DD/MM/YYYY HH:mm:ss").diff(
        moment(startTime, "DD/MM/YYYY HH:mm:ss")
      )
    )
    .format("H:mm:ss");

  return duration;
}

getTotalTime.propTypes = {
  points: PropTypes.array,
};

export function getElapsedTime(startPoint, endPoint) {
  var start = moment(startPoint.time.toUTCString()); //Start time as UTC string
  var end = moment(endPoint.time.toUTCString()); // End time as UTC string
  var duration = moment.duration(end.diff(start)); // Time difference, then convert to minutes
  var minutes = duration.asMinutes();
  return minutes;
}

getElapsedTime.propTypes = {
  startPoint: PropTypes.object,
  endPoint: PropTypes.object,
};

export function compressArray(arr, ratio = 10) {
  let rangingArray = _.range(0, arr.length, ratio); //Create array of integers between 0 and the arr length at intervals of ratio
  return _.pullAt(arr, rangingArray); // Return every ratio-th entry
}

compressArray.propTypes = {
  arr: PropTypes.array,
  ratio: PropTypes.number,
};

export function minTommss(minutes) {
  var sign = minutes < 0 ? "-" : "";
  var min = Math.floor(Math.abs(minutes));
  var sec = Math.floor((Math.abs(minutes) * 60) % 60);
  return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

minTommss.propTypes = {
  minutes: PropTypes.number,
};

//Takes in a flat array of values, chunks by n (default 10), finds the average of each chunks and outputs an array of the chunked averages
export function averageArrayValues(arr, n = 5) {
  let averagedValues = _.chunk(arr, n).map(
    (chunk, index) => chunk.reduce((a, b) => a + b) / chunk.length
  );
  return averagedValues;
}

averageArrayValues.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.number),
  n: PropTypes.number,
};

//Iterate over datapoints and add a 'pace' attribute
export function parsePaceData(points) {
  for (let i = 0; i < points.length - 1; i++) {
    let unclean =
      getElapsedTime(points[i], points[i + 1]) /
      distance(
        points[i].$.lng,
        points[i].$.lat,
        points[i + 1].$.lng,
        points[i + 1].$.lat
      );
    //    Check for irregularities (poor GPS signal, etc.)
    if (unclean > 15) {
      // Set as previous value, hoping that one is legit
      points[i].pace = points[i - 1].pace;
    } else {
      //  Otherwise set calculated pace for each points
      points[i].pace = unclean;
    }
  }

  //Create flat array of paces and elapsed time
  let paceArray = points.map((point, index) => point.pace);
  let timeArray = points.map((point, index) =>
    getElapsedTime(points[0], points[index])
  );

  // Get chunked averages for each array
  const averagedPaces = averageArrayValues(paceArray);
  const averagedTimes = averageArrayValues(timeArray);

  // Return xy dataset
  return averagedPaces.map((point, index) => ({
    x: averagedTimes[index],
    y: point,
  }));
}

parsePaceData.propTypes = {
    points: PropTypes.array,
}


export function getElevationGain(points, startIndex, endIndex) {
  let range = _.slice(points, startIndex, endIndex);
  let gain = 0;
  for (let i = 0; i < range.length - 1 ; i++) {
    let diff = range[i].ele - range[i+1].ele;
    if (diff > 0 ){
      gain += diff;
    }
  }
  let roundedGain = Math.round(gain * 100) / 100;
  return roundedGain.toString();
}

getElevationGain.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object),
  startIndex: PropTypes.number,
  endIndex: PropTypes.number
}

getElevationGain.defaultProps = {
  startIndex: 0,
}

// export function getFastestSplit(points, splitDistance, startIndex, endIndex) {
//   // Iterate over points, for each one find the corresponding point **distance** ahead.
//   let totalDistance = getDistance(points[startIndex].$.lng, points[startIndex].$.lat, points[endIndex.$.lng, points[endIndex].$.lat]);
//   let lastToMeasure = totalDistance - splitDistance;

//   let startPlace = 0;
//   while (startPlace < lastToMeasure){

//   }
//   //Get the elapsed time between each pair of points

//   // Find the minimum time of the pairs
// }

// export function getMaxElevationGain(points, startIndex, endIndex) {
//   let i = startIndex;
//   let maxGain = 0;
//   let pointCounter = 1;
//   while (i < endIndex - 1) {
//     let e1 = points[i];
//     let e2 = points[i+pointCounter];
//     if (e2 < e1) {
//       i++
//     } else {
//       maxGain += (e2 - e1);
//       i+=
//     }
//   }
//   return maxGain
// }

//Longest Increasing subsequence





// getMaxElevationGain.defaultProps = {
//   startIndex: 0,
//   descending: false
// }

// getMaxElevationGain.propTypes = {
//   points: PropTypes.arrayOf(PropTypes.object),
//   startIndex: PropTypes.number,
//   endIndex: PropTypes.number,
//   descending: PropTypes.bool,
// }

export function netDistance(points) {
  let arr = [];
  //For each datapoint, calculate distance in kilometers to the next point
  for (let i = 0; i < points.length - 1; i++) {
    const toAdd = distance(
      points[i].$.lng,
      points[i].$.lat,
      points[i + 1].$.lng,
      points[i + 1].$.lat
    );
    //Add partitioned distance to array
    arr.push(toAdd);
    points[i].elapsedTime = getElapsedTime(points[0], points[i]);
  }
  //Add all points, round to nearest 1/100th kilometer
  const sum = Math.round(arr.reduce((e, c) => e + c) * 100) / 100;
  //Return net distance for path
  return sum.toString();
}

export function averagePace(points){
  let distance = parseFloat(netDistance(points));
  let time = parseFloat(getElapsedTime(points[0], points[points.length - 1]));

  const averagePace = minTommss(time / distance);
  return averagePace
}

averagePace.propTypes = {
  points: PropTypes.array,
}