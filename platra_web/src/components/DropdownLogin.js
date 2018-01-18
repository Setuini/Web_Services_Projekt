import React from 'react';
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export class DropdownLogin extends React.Component {

  render() {
    return (
      <UncontrolledDropdown nav>
        <DropdownToggle nav caret>
          Login
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem>
            <InputGroup>
              <Input />
            </InputGroup>
          </DropdownItem>
          <DropdownItem>
            <InputGroup>
              <Input />
            </InputGroup>
          </DropdownItem>
          <DropdownItem divider />
          <Button>Login</Button>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}