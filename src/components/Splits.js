import React, { useEffect, useState } from 'react'
import { netDistance, minTommss } from '../utils'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Paper, { PaperTop } from './Paper'
import SplitsTable from './SplitsTable'



export const Splits = ({points}) => {
 const [ closestPoints, setClosestPoints ] = useState([]);


 function findClosestPoints(lastIntegerDistance, newPoints) {
     const splits = Array(lastIntegerDistance);
     let closestPoints = [];
     for (let i=1; i < splits.length + 1; i++) {
        let needle = i;
        let closest = newPoints.reduce((a, b) => {
             return Math.abs(b.netDistance - needle) < Math.abs(a.netDistance - needle) ? b : a;
        })
        closestPoints.push(closest);
     }
     return closestPoints;
 }

 let distanceFloor = Math.floor(netDistance(points));

 useEffect(() => {
     points.map((point, index) =>
       //Set the elapsed distance by looking at the net distance of points up to index-th point
       index >= points.length - 1 || index < 2
         ? (point.netDistance = 0)
         : (point.netDistance = netDistance(_.slice(points, 0, index)))
     );
     setClosestPoints(findClosestPoints(distanceFloor, points));
}, [distanceFloor, points])

if(!closestPoints.length) {
    return (
      <Paper color="primary">
        <PaperTop header="Loading splits..." color="primary" infoText={[`One second...`]} />
      </Paper>
    );
} else {
    const rawTimes = closestPoints.map((point, index) => (
    index > 0
        ? point.elapsedTime - closestPoints[index - 1].elapsedTime
        : point.elapsedTime
    ));
    return (
        <Paper color="primary">
            <PaperTop
            header="Splits"
            color="primary"
            infoText={[`Fastest km: ${minTommss(Math.min(...rawTimes))}`]}
            />
            <SplitsTable splits={closestPoints} />
        </Paper>
    );
  }
}

Splits.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object),
}

export default Splits