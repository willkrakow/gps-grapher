import React from "react";
import { minTommss, parsePaceData, averagePace } from "../utils";
import { Scatter } from "react-chartjs-2";
import PropTypes from "prop-types";
import Paper, { PaperTop } from "./Paper";
import { clickHandler } from '../utils/events'

const Pace = ({ points, color, handleClick, selectedPoint }) => {
  const data = {
    labels: ["Pace"],
    datasets: [
      {
        label: "Run",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        borderColor: "#f8fcff",
        pointBorderWidth: 2,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(23,162,184,0.5)",
        pointHoverBorderColor: "rgba(23,162,184,0.9)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 20,
        data: parsePaceData(points),
        showLine: true,
      },
    ],
  };

  const options = {
    showLines: true,
    line: {
      borderColor: "#60bf00",
      borderWidth: 5,
    },
    labels: {
      fontSize: 16,
      boxWidth: 40,
      boxHeight: 60,
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          //Convert float pace and time values to human-readable minutes
          item.value = `${minTommss(item.value)} min/kilometer.`;
          item.label = `Time: ${minTommss(item.label)}`;
          return `${item.value}
                  ${item.label}`;
        },
        title: function (item, data) {
          return `Pace`;
        },
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
            display: false,
            labelString: "Pace (min / kilometer)",
            fontColor: "#f8fcff",
            fontSize: 16,
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
      <PaperTop
        color={color}
        header="Pace"
        infoText={[`Average pace: ${averagePace(points)} / km`]}
      />
        <Scatter data={data} options={options} onElementsClick={(elems) => clickHandler(elems, handleClick)} />
    </Paper>
  );
};

Pace.propTypes = {
  points: PropTypes.array,
  color: PropTypes.string,
  handleClick: PropTypes.func
};

export default Pace;
