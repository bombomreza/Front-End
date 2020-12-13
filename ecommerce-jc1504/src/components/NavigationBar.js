import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {logoutAction} from '../redux/action'
// import {api_url} from '../helpers/api_url'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
// import Axios from 'axios';

class NavigationBar extends Component {
    state = { 
        isOpen: false,
     };
     toggle = () => {
         this.setState({
             isOpen: !this.state.isOpen
         })
     }

     clickLogout = () => {
        this.props.logoutAction()
        localStorage.removeItem('id')   
     }

    render() { 
        return ( 
            <div>
              <Navbar 
              style={{ backgroundColor:"#2E3840", 
              color:"white"}}
              dark
              expand="md"
              >
                <NavbarBrand href="/">YudhoStore</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <Link to="/products">
                    <NavItem>
                      <NavLink >Products</NavLink>
                    </NavItem>
                    </Link>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        User
                      </DropdownToggle>
                      {
                        this.props.email !==""
                        ?
                        (
                      <DropdownMenu right>
                        <Link to="/">
                            <DropdownItem>
                              Profile
                            </DropdownItem>                            
                        </Link>
                        <Link to="/cart">
                            <DropdownItem>
                              Cart
                            </DropdownItem>
                        </Link>
                        <Link to="/">
                            <DropdownItem onClick={this.clickLogout}>
                              Log Out
                            </DropdownItem>
                        </Link>

                      </DropdownMenu>
                        )
                      :
                      (
                        <DropdownMenu right>
                        <Link to="/login">
                            <DropdownItem>
                              Login
                            </DropdownItem>                            
                        </Link>
                        <Link to="/register">
                            <DropdownItem>
                              Register
                            </DropdownItem>
                        </Link>
                      </DropdownMenu>                          
                        )
                      }
                    </UncontrolledDropdown>
                  </Nav>
                  {this.props.email ? (
                    <NavbarText>{this.props.email}</NavbarText>
                  ) : null}
                </Collapse>
              </Navbar>
            </div>
         );
    }
}
 
const mapStatetoProps = ({user}) => {
  return{
    email: user.email,
  };
};

// const mapStatetoLogout = ({user}) => {
//   return{
//     email:""
//   }
// }

export default connect(mapStatetoProps, {logoutAction}) (NavigationBar);