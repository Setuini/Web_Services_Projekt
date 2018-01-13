import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { TimetableDay } from './TimetableDay.js';


export class Timetable extends React.Component {

  render() {
    return (
      <div>
        <Container>
          <Row>
              <TimetableDay/>
              <TimetableDay/>
              <TimetableDay/>
              <TimetableDay/>
          
          </Row>
        </Container>
      </div>
    );
  }

}