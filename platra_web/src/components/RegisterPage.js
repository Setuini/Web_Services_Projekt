import React from 'react';
import { Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';


export class RegisterPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: 'Test',
      email: 'test@test.at',
      password: 'test',
      password_validate: 'test',
      fireRedirect: false,
      errors: ''
    };

    //if the function needs to access the state it has to be bound
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    console.log('Post Register\nName:' + this.state.name + '\nE-Mail:' + this.state.email + '\nPassword: ' + this.state.password);
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');

    var data = JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_validate
    });

    fetch("http://127.0.0.1:3000/api/v1/register",{
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: data
    })
    .then((res) => {
      return res.json();
    })
    .then((resdata) => {
      console.log('Response Register:\n');
      console.log(JSON.stringify(resdata)); 
      this.setState({
        msg: JSON.stringify(resdata),
      });

      //if msg contoins no errors
      if (this.state.msg.includes("successfully") ) {
        console.log("redirect");
        this.setState({
          fireRedirect: true
        });
      }else{
        var result = this.state.msg.substring(10, this.state.msg.length-4);
        this.setState({
          errors: result 
        });
      }

    })
    .catch( (ex) => {
      console.log("Fetch failed" + ex);
      this.setState({
        errors: "Registration failed"
      })
    });

    event.preventDefault();
  }

  render() {
    this.error = null;
    if (this.state.errors !== '') {
      this.error = <Alert color="danger" className="error">{this.state.errors}</Alert>;
    }
    return (
      <Container>
        <Row>
          <Col lg={{ size: 6, offset: 3 }} sm={{ size: 10, offset: 1}} className="vh-80 d-flex align-items-center">
            <Form className="col-12" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input type="text" name="name" placeholder="Full Name" onChange={this.handleChange} required/>
              </FormGroup>
               <FormGroup>
                <Input type="email" name="email" placeholder="E-Mail-Address" onChange={this.handleChange} required/>
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" placeholder="Password" onChange={this.handleChange} required/>
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password_validate" placeholder="Password confirmation" onChange={this.handleChange} required/>
              </FormGroup>
            
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"/>{' '}
                  Accept Terms and conditions
                </Label>
              </FormGroup>

              <Row>
                <Col>
                  {this.error}
                </Col>
              </Row>

              <Button block type="submit" className="button-platra">Register</Button>
              
              {this.state.fireRedirect && (<Redirect to={'/login'}/>)}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
