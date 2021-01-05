import styled from 'styled-components'
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { TagHeader, InfoText } from './Typography'
import PropTypes from 'prop-types'


const Paper = styled.div.attrs((props) => ({
className: `${props.noPadding ? "" : "p-5"} shadow bg-${props.color} text-light`,
}))`
  border-radius: 20px;
  background-image: linear-gradient(to bottom right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 50%, rgba(255, 255, 255, 0.1));
`;

export default Paper;

export const PaperTop = ({ header, infoText, color }) => (
    <Container>
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <TagHeader color={color}>{header}</TagHeader>
        </Col>
        <Col xs={12} md={6}>
          {infoText.map((info, i) => (
            <InfoText key={i}>{info}</InfoText>
          ))}
        </Col>
      </Row>
    </Container>
);


PaperTop.propTypes = {
    header: PropTypes.string,
    infoText: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
}

export const ChartWrapper = styled.div`
@media(max-width: 575px) {
    max-height: 80vh;
}
`