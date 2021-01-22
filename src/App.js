import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Input, FormGroup } from "reactstrap";
import Map from "./components/Map";
import GPX from "gpx-parser-builder";
import Elevation from "./components/Elevation"
import Pace from "./components/Pace";
import { compressArray } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import { TagTitle } from "./components/Typography";
import Paper from './components/Paper';
import Splits from './components/Splits'
import styled from 'styled-components'
import { UploadButton, BrowseLabel } from './components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const HomeContainer = styled(Container)`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const FileName = styled.p.attrs(props => ({
  className: "text-light"
}))`
  font-weight: bold;
  display: flex;
  margin: auto 20px;
`

const NameSpan = styled.span`
  min-width: ${(props) => (props.file ? "100px" : "0")};
  margin: auto 0;
`;

export default function App() {

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [file, setFile] = useState(null);
  const [parsed, setParsed] = useState([]);
  const [uploadName, setUploadName] = useState('');


  let fileReader;
  
  function handleFileChange(e) {
    fileReader = new FileReader();
    let ext = e.target.files[0].name.split('.').pop();
    if (ext !== "gpx") {
        alert("Accepts .gpx files only") 
    }  else {
    setUploadName(e.target.files[0].name);
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(e.target.files[0]);
    }
  }

  function handleFileRead(e) {
    setFile(fileReader.result);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let gpx = GPX.parse(file);
    if (gpx.trk[0]) {
let compressed = compressArray(gpx.trk[0].trkseg[0].trkpt);
setParsed(compressed);
    }
  }


  function handleClick(index) {
    try {
      setSelectedPoint(index);
    } catch (error) {
      alert(error);
      setSelectedPoint(null);
    }
  };



const hiddenFileInput = useRef();

const handleBrowseClick = (event) => {
  hiddenFileInput.current.click();
};
  if (!parsed.length) {


    return (
      <Paper color="primary" noPadding>
        <HomeContainer>
          <Row>
            <Col xs={12} className="text-center">
              <TagTitle>Upload an activity file</TagTitle>
              <Form inline onSubmit={handleSubmit}>
                <FormGroup>
                  <BrowseLabel for="gpxfile" onClick={handleBrowseClick}>
                    .gpx only
                    <Input
                      id="gpxFile"
                      name="file"
                      type="file"
                      innerRef={hiddenFileInput}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e)}
                    />
                  </BrowseLabel>
                </FormGroup>
                <FileName>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    size={"3x"}
                    className="px-2 text-light"
                  />
                  <NameSpan file={file}>{uploadName}</NameSpan>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    size={"3x"}
                    className="px-2 text-light"
                  />
                </FileName>
                <UploadButton onClick={() => console.log(file)} disabled={file ? false : true}>
                  Upload
                </UploadButton>
              </Form>
            </Col>
          </Row>
        </HomeContainer>
      </Paper>
    );
  }
return (
  <>
    <Container className="mb-5 p-3 p-md-5">
      <Row className="my-5">
        <Col xs={12}>
          <TagTitle>Afternoon Run</TagTitle>
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <Map
            color="success"
            zoom={10}
            points={parsed}
            selectedPoint={selectedPoint}
            handleClick={handleClick}
          />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <Elevation
            color="danger"
            points={parsed}
            selectedPoint={selectedPoint}
            handleClick={handleClick}
          />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <Pace points={parsed} color="info" handleClick={handleClick} />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <Splits points={parsed} />
        </Col>
      </Row>
    </Container>
  </>
);
  
};