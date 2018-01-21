import React from 'react';
import { Form, Button } from 'reactstrap';

export class AuthTest extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // curl --header "Authorization: Bearer <JWT>" http://localhost:3000/test
  handleSubmit(event) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('jwt')));

    fetch("http://127.0.0.1:3000/auth",{
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    })
    .then((res) => {
      return res.json(); 
    })
    .then((resdata) => {
      console.log("You should see AUTH in your rails console");
      console.log('Response Register:\n');
      console.log(JSON.stringify(resdata));
    })
    .catch( (ex) => {
      console.log("Fetch failed" + ex);
    });
    //prevent page from reloading
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>You have to login before running this!</h1>
        <Button block type="submit" className="button-platra">Test</Button>
      </Form>
    );
  }
}