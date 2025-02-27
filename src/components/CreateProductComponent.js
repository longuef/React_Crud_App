import React, { Component } from 'react'
import HeaderComponent from './HeaderComponent';
import LeftNavBar from './elements/LeftNavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../store/actions';
import { connect } from 'react-redux';
import * as action from '../store/actions'

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: "",
            price: "",
            unit: "",
            description: "",
            messageName: "",
            messagePrice: "",
            messageUnit: ""
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeUnitHandler = this.changeUnitHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = { name: this.state.name, price: this.state.price, unit: this.state.unit, description: this.state.description };
        this.props.createProduct(product);
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }

    changeUnitHandler = (event) => {
        this.setState({ unit: event.target.value });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    cancel() {
        return this.props.history.push('/');
    }

    getpModal() {
        if (this.state.id === '_add') {
            return "create"
        } else {
            return "save change"
        }
    }

    render() {
        const detail_Data = this.props.example.products.data;
        // console.log(detail_Data.name, detail_Data.price, detail_Data.unit, detail_Data.description);
        return (
            <div className="container nav-md body">
                <div className="main_container">
                    <LeftNavBar />
                    <HeaderComponent />
                    <div className="right_col" role="main">
                        <div className="">
                            <div className="page-title">
                                <div className="title_left">
                                    <h3>Products</h3>
                                </div>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={1000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                                <div className="title_right">
                                    <div className="col-md-5 col-sm-5 form-group pull-right top_search">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search for..." />

                                            <span className="input-group-btn">
                                                <button className="btn btn-default" type="button">Go!</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="x_panel">
                                        <div className="x_content">
                                            <form className="" action="" method="post" noValidate>

                                                <span className="section">
                                                    <h3 className="text-center">Create Product</h3>
                                                </span>

                                                <div className="field item form-group">
                                                    <label className="col-form-label col-md-3 col-sm-3  label-align">Name Product  {this.messageName}<span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="alret-field">{this.state.messageName}</div>
                                                        {/* <input className="form-control" value={this.state.name} onChange={this.changeNameHandler} data-validate-length-range="6" data-validate-words="2" name="name" placeholder="ex. Quần short " required="required" /> */}
                                                        <input className="form-control" onChange={this.changeNameHandler} data-validate-length-range="6" data-validate-words="2" name="name" placeholder="ex. Quần short " required="required" />
                                                    </div>
                                                </div>
                                                <div className="field item form-group">
                                                    <label className="col-form-label col-md-3 col-sm-3  label-align">Price<span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="alret-field">{this.state.messagePrice}</div>
                                                        {/* <input className="form-control optional" value={this.state.price} onChange={this.changePriceHandler} name="price" data-validate-length-range="5,15" type="number" /> */}
                                                        <input className="form-control optional" onChange={this.changePriceHandler} name="price" data-validate-length-range="5,15" type="number" />
                                                    </div>
                                                </div>
                                                <div className="field item form-group">
                                                    <label className="col-form-label col-md-3 col-sm-3  label-align">Unit <span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="alret-field">{this.state.messageUnit}</div>
                                                        {/* <input className="form-control" value={this.state.unit} onChange={this.changeUnitHandler} type="text" name="unit" data-validate-minmax="10,100" required='required' /></div> */}
                                                        <input className="form-control" onChange={this.changeUnitHandler} type="text" name="unit" data-validate-minmax="10,100" required='required' /></div>
                                                </div>
                                                <div className="field item form-group">
                                                    <label className="col-form-label col-md-3 col-sm-3  label-align">Description<span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6">
                                                        {/* <textarea className="form-control date" value={this.state.description} onChange={this.changeDescriptionHandler} type="text" name="description" rows={10} required='required' /></div> */}
                                                        <textarea className="form-control date" onChange={this.changeDescriptionHandler} type="text" name="description" rows={10} required='required' /></div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-md-6 offset-md-3">
                                                        <button type="button" data-toggle="modal" data-target=".ModalCreate" className="btn btn-success">Submit</button>
                                                        <button type='reset' onClick={this.resetInput} className="btn btn-warning">Reset</button>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <button onClick={this.cancel.bind(this)} className="btn btn-primary">Back</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="modal fade ModalCreate" tabIndex="-1" role="dialog" aria-hidden="true">
                                                <div className="modal-dialog modal-md">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <div className="modal-title" id="myModalLabel2">
                                                                create
                                                            </div>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>Are you sure you want to {this.getpModal()} the product?</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type='submit' className="btn btn-primary" data-dismiss="modal" onClick={this.saveOrUpdateProduct}>Yes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: (PageNumber) => {
            dispatch(getProducts(PageNumber));
        },
        createProduct: (Product) => {
            dispatch(createProduct(Product));
        },
        getProductById: (ProductId) => {
            dispatch(getProductById(ProductId));
        },
        updateProduct: (Product, ProductId) => {
            dispatch(updateProduct(Product, ProductId));
        },
        deleteProduct: (ProductId) => {
            dispatch(deleteProduct(ProductId));
        },
        fetch: () => {
            dispatch(fetch());
        },
    };
}

function mapStateToProps(state) {
    return {
        example: state.example,
    }
}

// export default CreateProductComponent;

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductComponent);