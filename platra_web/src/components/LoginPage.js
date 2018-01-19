import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


export class LoginPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={{ size: 6, offset: 3 }} sm={{ size: 10, offset: 1}} className="vh-80 d-flex align-items-center">
            <Form className="col-12">
              <FormGroup>
                <Input type="email" name="email" placeholder="E-Mail-Address" />
              </FormGroup>
              <FormGroup>
                <Input type="email" name="password" placeholder="Password" />
              </FormGroup>
              <Row>
                <FormGroup check className="col-6">
                  <Label className="checkbox" check>
                    <Input type="checkbox"/>{' '}
                    Stay logged in
                  </Label>
                </FormGroup>
                <a href="/" className='col-6 text-right'>Forgot your password?</a>
              </Row>
              <Button block className="button-platra">Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}