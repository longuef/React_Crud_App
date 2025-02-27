import React, { Component } from 'react'
import HeaderComponent from './HeaderComponent';
import Moment from 'moment';
import LeftNavBar from './elements/LeftNavBar';
import Pagination from "react-js-pagination";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../store/actions';
import { connect } from 'react-redux';
// const src = "https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.15752-9/289028921_715669672977948_2184728477575193761_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=sRfFaXNtAqYAX9puhDf&_nc_ht=scontent.fsgn5-12.fna&oh=03_AVJaX9NKEN8HT8takKA_ixdaE-iOJQZCCKiQ9mK7yD0LTg&oe=63142DC9";
const src = "https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif";

class ListProductComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
			IDDelete: "",
			itemCount: 0,
			currentPage: 1,
		}
	}

	componentDidMount() {
		return this.props.getProducts(this.state.currentPage);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.example.reload !== this.props.example.reload && this.props.example.reload === true) {
			this.props.example.reload = false;
			this.props.getProducts(this.state.currentPage);
		}
	}
	handlePageChange = pageNumber => {
		this.state.currentPage = pageNumber;
		this.props.getProducts(pageNumber);
	};


	deleteProduct(id) {
		this.props.deleteProduct(id);
	}

	viewProduct(id) {
		this.props.history.push(`/product/${id}`);
	}

	saveAndContinue(id) {
		this.setState({ ...this.state, IDDelete: id })
	}

	addProduct() {
		this.props.history.push('/add-product');
	}

	refreshPage() {
		this.props.getProducts(this.state.currentPage = 1);
	}
	formatMoney = (amt) => {
		var money = new Intl.NumberFormat("de-DE", { style: "currency", "currency": "VND" }).format(amt);
		return money;
	}

	render() {
		const data = this.props.example;
		const productList = data.products.data;
		const productLength = data.products.length;
		const dataLoading = data.products.loading;
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
									autoClose={5000}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									rtl={false}
									pauseOnFocusLoss
									draggable
									pauseOnHover
								/>
								<div className="title_right">
									<div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
										<div className="input-group">
											<input type="text" className="form-control" placeholder="Search for..." />
											<span className="input-group-btn">
												<button className="btn btn-secondary" type="button">Go!</button>
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className="clearfix"></div>
							<div className="row">
								<div className="col-md-12 col-sm-12  ">
									<div className="x_panel">
										<div className="x_title">
											<h2>List Product</h2>
											<ul className="nav navbar-right panel_toolbox">
												<li><button onClick={() => this.refreshPage()} className='btn btn-outline-primary'><i className="fa fa-refresh"></i> Reload</button></li>
												<li><button onClick={() => this.addProduct()} className='btn btn-outline-success'><i className="fa fa-plus"></i> New Product</button></li>

												<li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
												</li>
												<li><a className="close-link"><i className="fa fa-close"></i></a>
												</li>
											</ul>
											<div className="clearfix"></div>
										</div>

										<div className="x_content">
											<div className="table-responsive">
												{dataLoading ?
													<div>
														Loading Data...
														<br />
														<img src={src} />
													</div>
													: null
												}
												<table className="table table-striped jambo_table bulk_action">
													<thead>
														<tr className="headings">

															<th className="column-title"> ID</th>
															<th className="column-title"> Product Name</th>
															<th className="column-title"> Price </th>
															<th className="column-title"> Unit</th>
															<th className="column-title"> Creater</th>
															<th className="column-title"> Create Day</th>
															<th className="column-title"> Updater</th>
															<th className="column-title"> Update Day</th>
															<th className="column-title no-link last"><span className="nobr">Action</span>
															</th>
															<th className="bulk-actions" colSpan="7">
																<a className="antoo" >Bulk Actions ( <span className="action-cnt"> </span> ) <i className="fa fa-chevron-down"></i></a>
															</th>
														</tr>
													</thead>
													<tbody>
														{
															productList ?
																productList.map((data, i) => {
																	return (
																		<tr key={i} className="even pointer">
																			<td className="table-td-center">
																				{data.id}
																			</td>
																			<td className="table-td-center"> {data.name} </td>
																			{/* <td className="table-td-center"> {data.price}</td> */}
																			<td className="table-td-center"> {this.formatMoney(data.price)}</td>
																			<td className="table-td-center"> {data.unit}</td>
																			<td className="table-td-center"> {data.created_user}</td>
																			<td className="table-td-center"> {data.created_at = Moment().format('DD-MM-YYYY')}</td>
																			<td className="table-td-center"> {data.updated_user}</td>
																			<td className="table-td-center"> {data.updated_at = Moment().format('DD-MM-YYYY')}</td>
																			<td>
																				<button onClick={() => this.viewProduct(data.id)} className="btn btn-outline-info"><i className="fa fa-info-circle"></i> </button>
																				<button data-toggle="modal" data-target=".ModalDelete" onClick={() => this.saveAndContinue(data.id)} className="btn btn-outline-danger"><i className="fa fa-trash"></i> </button>
																			</td>
																		</tr>
																	)
																}) : []
														}
													</tbody>
												</table>

												<Pagination
													activePage={this.state.currentPage}
													itemsCountPerPage={25}
													totalItemsCount={productLength || 25}
													pageRangeDisplayed={0}
													onChange={this.handlePageChange}
													breakClassName={'page-item'}

													breakLinkClassName={'page-link'}
													containerClassName={'pagination'}
													pageClassName={'page-item'}
													pageLinkClassName={'page-link'}
													previousClassName={'page-item'}
													previousLinkClassName={'page-link'}
													nextClassName={'page-item'}
													nextLinkClassName={'page-link'}
													activeClassName={'active'}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade ModalDelete" tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog modal-md">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title" id="myModalLabel2">Delete Product</h4>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<p>Are you sure you want to delete the product?</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { this.deleteProduct(this.state.IDDelete); }}>Delete</button>

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

// export default ListProductComponent

export default connect(mapStateToProps, mapDispatchToProps)(ListProductComponent)