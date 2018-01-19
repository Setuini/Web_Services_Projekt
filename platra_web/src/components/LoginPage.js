import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


export class LoginPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg='5'>
            <Form>

              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="fritz.fantom@uibk.at" />
              </FormGroup>

              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password" />
              </FormGroup>
              <Button>Login</Button>
            </Form>

          </Col>
        </Row>
      </Container>
    );
  }
}