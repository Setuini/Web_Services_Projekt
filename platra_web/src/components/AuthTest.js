import React from 'react';
import { Form, Button } from 'reactstrap';

export class AuthTest extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization: Bearer '+localStorage.getItem('jwt'))

    console.log("AuthTest");


    fetch("http://127.0.0.1:3000/user_token",{
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: ''
    })
    .then((res) => {
      return res.json(); 
    })
    .then((resdata) => {
      console.log("You should see AUTH in your rails console");
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
      <Form onSubmit={this.handleSubmit}>
        <h1>You have to login before running this!</h1>
        <Button block type="submit" className="button-platra">Test</Button>
      </Form>
    );
  }
}