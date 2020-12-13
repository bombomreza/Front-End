import Axios from 'axios';
import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import {api_url} from '../helpers/api_url';
import {connect} from 'react-redux';
import {loginAction} from '../redux/action'
import {Link, Redirect } from 'react-router-dom';

class RegisterPage extends Component {
    state = { 
        email: "",
        password: "",
        confirmPass:"",
        
     }

    clickRegister = () => {
        const {email, password, confirmPass} = this.state;
        if(password === confirmPass) {
            Axios.get(`${api_url}/users?email=${email}`)
            .then((res) => {
                if (res.data.length === 0) {
                    Axios.post(`${api_url}/users`, {email, password}).then((res) => {
                        this.props.loginAction(res.data);
                        localStorage.setItem('id', res.data.id);
                        // console.log("lanjut register");
                        // console.log(res.data)
                    })
                } else {
                    alert("Email already taken")
                }
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            alert("Invalid Password")
        }
    }
     onChangeInput = (e) => {
         this.setState({
                 ...this.state,
                 [e.target.id]: e.target.value,
         });
         console.log(e.target.value)
     };

    render() { 
        if(this.props.email !== ""){
            return(
                <Redirect to="/" />
            )
        }
        return ( 
            <div>
                <center>
                <h3 style= {{margin: "10px"}}>
                    Join us!
                </h3>
                <h6>Register to create YudhoStore account</h6>
                <div>
                    <Input
                        className="text-center"
                        style={{
                        width:"250px",
                        margin:"10px"
                        }} 
                        placeholder="Email" 
                        id="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChangeInput}
                    />
                </div>
                <div>
                    <Input
                        className="text-center"
                        style={{
                        width:"250px",
                        margin:"10px"
                        }} 
                        placeholder="Password" 
                        id="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeInput}
                    />
                </div>
                <div>
                    <Input
                        className="text-center"
                        style={{
                        width:"250px",
                        margin:"10px"
                        }}
                        placeholder="Confirm Password" 
                        id="confirmPass"
                        type="password"
                        value={this.state.confirmPass}
                        onChange={this.onChangeInput}
                    />
                </div>
                <div>
                    <Button onClick={this.clickRegister}>Register</Button>
                </div>
                <h6 style={{fontSize:"13px", marginTop:"10px"}}>
                    Have an account?
                </h6>
                <Link to="/login">
                    <h6 style={{fontSize:"10px", marginTop:"10px"}}>
                    Click here to log in</h6>
                </Link>
                </center>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        email: state.user.email,
    }
}
 
export default connect(mapStatetoProps, {loginAction}) (RegisterPage);