import React, { Component } from 'react';
import querystring from 'querystring'
// import Axios from 'axios';
// import {api_url} from '../helpers/api_url'
import { connect } from 'react-redux';
import { fetchProductByIdAction, addToCartAction } from '../redux/action';
import { Button } from 'reactstrap';
import Fade from 'react-reveal'



class ProductDetail extends Component {
    state = { 
        data: {},
        qtySelected: 1,
     };
    componentDidMount() {
         const {fetchProductByIdAction} = this.props;
         const productID = querystring.parse(this.props.location.search)["?id"] ;
         fetchProductByIdAction(productID);
         console.log(productID)
     }
    increaseQty = () => {
         this.setState({
             qtySelected: this.state.qtySelected + 1,
         });
    };
    decreaseQty = () => {
          this.setState({
             qtySelected: this.state.qtySelected - 1,
         });
    };

    addToCart = () => {
        const {productById, userID, addToCartAction} = this.props;
        const {qtySelected} = this.state;
        const {name,price,image} = productById;
        const dataCart = {
            name,
            qty: qtySelected,
            price,
            userID,
            image,
        };
        console.log(dataCart)
        addToCartAction(dataCart)
    };

    render() { 
        const {name, price, stock, image} = this.props.productById
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div>
                        <Fade buttom>
                            <img src={image} alt={`${name}.jpg`} height="300px" />
                        </Fade>
                        </div>
                    </div>
                    <div className="col-4">
                        <div>
                            <h1>{name}</h1>
                        </div>
                        <div>
                            <h1>Rp.{price ? price.toLocaleString() : null}</h1>
                        </div>
                        <div>
                            Available: {stock}
                        </div>
                        <div>Description Block</div>
                        <div>
                            <Button
                              color="info" 
                              onClick={this.decreaseQty} 
                              disabled={this.state.qtySelected === 1}
                            >-</Button>
                            {this.state.qtySelected}
                            <Button
                              color="info"
                              onClick={this.increaseQty} 
                              disabled={this.state.qtySelected === stock}
                              >+</Button>
                        </div>
                        <div>
                            <Button
                              color="info" 
                              onClick={this.addToCart}
                              >Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </div> 
         );
    }
}

const mapStatetoProps = (state) => {
    return {
        productById : state.products.productById,
        userID: state.user.id,
    }
}
 
export default connect(mapStatetoProps,{fetchProductByIdAction, addToCartAction}) (ProductDetail);