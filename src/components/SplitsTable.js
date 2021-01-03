import React from "react";
import { Table } from "reactstrap";
import { minTommss } from "../utils";

const SplitsTable = ({ splits }) => (
  <Table size="md" className="text-light">
    <thead>
      <tr>
        <th>Kilometer</th>
        {splits.map((split, index) => (
          <th key={index}>{index.toString()}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Time</th>
        {splits.map((split, index) => (
          <td key={index}>{index > 0 ? minTommss(split.elapsedTime - splits[index - 1].elapsedTime) : minTommss(split.elapsedTime)}</td>
        ))}
      </tr>
    </tbody>
  </Table>
);

export default SplitsTable;
