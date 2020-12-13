import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchCategoriesAction, fetchProductsAction, fetchCategoryAction} from '../redux/action'
import Select from 'react-select'
import {ProductCard} from '../components'
import { Link } from 'react-router-dom';
// import Axios from 'axios';
// import {api_url} from '../helpers/api_url'

class ProductPage extends Component {
    state = { 
        categoryID : "",
        categorybyid: 0,
        productList:[],
     };
    
    componentDidMount(){
        const {fetchCategoriesAction, fetchProductsAction} = this.props;
        fetchCategoriesAction();
        fetchProductsAction();
    }

    componentDidUpdate(pP, pS, sS) {
        const {fetchCategoryAction, fetchProductsAction} = this.props;
        if(pS.categoryID !== this.state.categoryID){
            if(this.state.categoryID === 0){
                fetchProductsAction()
            } else {
                fetchCategoryAction(this.state.categoryID)
            }
        }
        console.log(this.props.productList)
    }

    renderCategoryList = () => {
        let newArr = this.props.categories.map((val) => {
            return {value: val.id, label: val.category};
        });
        return <Select options={newArr} onChange={this.onChangeCategory} />
    };

    
    onChangeCategory = (e) => {
        this.setState({
            categoryID : e.value,  
        })
        console.log(this.state.categoryID)
    };

    renderProductList = () => {
        return this.props.productList.map((val) => {
            return (
            <div className="m-2">
                <Link to={`/product-detail?id=${val.id}`}>
                    <ProductCard image={val.image} name={val.name} price={val.price} />
                </Link>
            </div> 
            )
        })
    }

    render() { 
        return (
            <div className="row">
                <div className="col-3">
                    <div>
                        <h6>Categories</h6>
                    </div>
                    <div>
                        {this.renderCategoryList()}
                    </div>
                </div>
                <div className="col-9" style={{display:"flex", flexWrap:"wrap"}}>
                    {this.renderProductList()}
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        categories: state.products.categories,
        productList: state.products.productList,
        // category: state.products.category
    }
}

export default connect(mapStatetoProps,{fetchCategoriesAction, fetchProductsAction, fetchCategoryAction}) (ProductPage);