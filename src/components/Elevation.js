import React from "react"
import { Scatter } from "react-chartjs-2"
import PropTypes from "prop-types"
import { getElapsedTime, minTommss, getElevationGain } from "../utils"
import Paper, { PaperTop } from './Paper'
import { clickHandler, useStylePoints } from '../utils/events'

//For each datapoint, set x to the elapsed time since start in minutes, y as the elevation in ft.
function parseElevationData(points) {
  let data = points.map((point, index) => ({
    x: getElapsedTime(points[0], points[index]),
    y: parseFloat(point.ele),
  }));
  return data;
}

const Elevation = ({ points, handleClick, selectedPoint, color }) => {
    const pointStyles = useStylePoints(points, selectedPoint);
  const data = {
    labels: ["Elevation Data"],
    datasets: [
      {
        label: "Run",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        pointBorderColor: pointStyles,
        pointBackgroundColor: pointStyles,
        borderColor: "#f8fcff",
        pointBorderWidth: 2,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(220,53,69,0.5)",
        pointHoverBorderColor: "rgba(220,53,69,0.9)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 20,
        data: parseElevationData(points),
        showLine: true,
      },
    ],
  };

  const options = {
    showLine: true,
    line: {
      borderColor: "#60bf00",
      borderWidth: 5,
    },
    labels: {
      fontSize: 24,
      boxWidth: 40,
      boxHeight: 60,
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          item.value = `${item.value} ft.`;
          //Convert time as float to human-readable time
          item.label = `Time: ${minTommss(item.label)}`;
          return `${item.value}
                  ${item.label}`;
        },
        title: function (item, data) {
          return `Elevation`;
        },
        y: 100,
      },
      titleFontSize: 24,
      bodyFontSize: 16,
      displayColors: false,
      bodySpacing: 16,
      mode: "index",
      yPadding: 24,
      xPadding: 24,
      intersect: false,
      height: 60,
    },
    hover: {
      intersect: false,
      mode: "index",
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Elevation (ft.)",
            fontColor: "#f8fcff",
            fontSize: 24,
          },
          ticks: {
            fontColor: "#f8fcff",
            fontSize: 16,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time (minutes)",
            fontColor: "#f8fcff",
            fontSize: 24,
          },
          ticks: {
            fontColor: "#f8fcff",
            fontSize: 16,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  
  return (
    <Paper color={color}>
        <PaperTop header="Elevation" infoText={[`Total ascent: ${getElevationGain(points, 0, points.length)} ft.`]} color={color} />
      <Scatter
        data={data}
        onElementsClick={(elems) => clickHandler(elems, handleClick)}
        options={options}
        
      />
    </Paper>
  );
};

export default Elevation;

Elevation.propTypes = {
  handleClick: PropTypes.func,
  selectedPoint: PropTypes.number,
  point: PropTypes.array,
};
