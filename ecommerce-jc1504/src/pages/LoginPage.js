import Axios from 'axios';
import React, { Component } from 'react';
import {Button, Input} from 'reactstrap'
import {api_url} from '../helpers/api_url'
import {loginAction} from '../redux/action'
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom'

class LoginPage extends Component {
    state = { 
        loginInfo:{
            email:"",
            password:"",
        },
     };

     onChangeInput = (e) => {
         this.setState({
             loginInfo:{
                 ...this.state.loginInfo,
                 [e.target.id]: e.target.value,
             },
         });
         console.log([e.target.id])
     };
     clickLogin = () => {
         const {email, password} = this.state.loginInfo
         Axios.get(`${api_url}/users?email=${email}&password=${password}`)
        .then((res) => {
            // console.log(res.data[0]);
            if (res.data.length !==0){
                this.props.loginAction(res.data[0]);
                localStorage.setItem('id',res.data[0].id);
            } else{
                alert ("User Invalid");
            }
        })
        .catch((err) => {
            console.log(err)
        });
        };

    render() { 
        const{email, password} = this.state.loginInfo
        if(this.props.emailUser !== ""){
            return <Redirect to="/"/>
        }
        return ( 
            <div>
                <center>
                    <h3 style= {{margin: "10px"}}>
                        Hello
                    </h3>
                    <h6>Log in to your account</h6>
                <div>
                    <Input
                        className="text-center"
                        style={{
                        width:"250px",
                        margin:"10px"
                        }}                      
                        placeholder="Email" 
                        type="email"  
                        id="email" 
                        onChange={this.onChangeInput}
                        value={email}
                    />
                    <Input
                        className="text-center"
                        style={{
                        width:"250px",
                        margin:"10px"
                        }}  
                        placeholder="Password" 
                        type="password" 
                        id="password" 
                        onChange={this.onChangeInput} 
                        value={password}
                    />
                    <Button onClick={this.clickLogin}>Log In</Button>
                </div>
                </center>
            </div>
         );
    }
}
 
const mapStatetoProps = (state) => {
    return{
        emailUser : state.user.email
    };
};

export default connect(mapStatetoProps, {loginAction}) (LoginPage);