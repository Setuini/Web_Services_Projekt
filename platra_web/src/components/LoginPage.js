import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


export class LoginPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      jwt: '',
      email: '',
      password: '',
      pwvisible: '',
      errors: ''
    };

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
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');

    var data = JSON.stringify({"auth":{email: this.state.email, password: this.state.password}});
    console.log("Login");
    console.log(data);

    fetch("http://127.0.0.1:3000/user_token",{
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: data
    })
    .then((res) => {
      return res.json(); 
    })
    .then((resdata) => {
      this.setState({jwt : JSON.stringify(resdata.jwt)});
      localStorage.setItem("jwt", JSON.stringify(resdata.jwt));
      //console.log("JWT: "+this.state.jwt);
      //save jwt in the browsers local storage
      localStorage.setItem('jwt', this.state.jwt);
      console.log("JWT: "+localStorage.getItem('jwt'));
    })
    .catch( (ex) => {
      console.log("Fetch failed" + ex);
      this.setState( {errors : ex } );
    });
    //prevent page from reloading
    event.preventDefault();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={{ size: 6, offset: 3 }} sm={{ size: 10, offset: 1}} className="vh-80 d-flex align-items-center">
            <Form className="col-12" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input type="email" name="email" placeholder="E-Mail-Address" onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
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
              <Button block type="submit" className="button-platra">Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}