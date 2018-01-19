import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


export class RegisterPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={{ size: 6, offset: 3 }} sm={{ size: 10, offset: 1}} className="vh-80 d-flex align-items-center">
            <Form className="col-12">
              <FormGroup>
                <Input type="text" name="name" placeholder="Full Name" />
              </FormGroup>
               <FormGroup>
                <Input type="email" name="email" placeholder="E-Mail-Address" />
              </FormGroup>
              <FormGroup>
                <Input type="email" name="password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Input type="email" name="password" placeholder="Password confirmation" />
              </FormGroup>
            
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"/>{' '}
                  Accept Terms and conditions
                </Label>
              </FormGroup>

              <Button block className="button-platra">Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}