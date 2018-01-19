import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Search } from './Search.js';
import { SearchAutocomplete } from './SearchAutocomplete.js';

export class Landing extends React.Component {



  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Search/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}