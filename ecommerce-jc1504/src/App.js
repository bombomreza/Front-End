import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {NavigationBar} from './components'
import {Landing, LoginPage, ProductDetail, ProductPage, RegisterPage, CartPage} from './pages'
import {keepLogin} from './redux/action'



class App extends Component {
  state = {};

  componentDidMount(){
    const id =  localStorage.getItem('id')
    if(id){
      this.props.keepLogin(id);
    }
  }
  
  render() { 
    return ( 
      <div>
        <NavigationBar/>
        <Route path="/" exact component={Landing  } />
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/products" component={ProductPage}/>
        <Route path="/product-detail" component={ProductDetail}/>
        <Route path="/cart" component={CartPage}/>
      </div> 
      );
  }
}
 


export default connect(null, {keepLogin}) (App);