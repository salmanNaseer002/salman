
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Footer from "../core/Footer";
import { listProductSeller, deleteProduct } from "./apiAdmin";
import './AdminDashboard.css';
import Particles from './Particles';
import './Particle.css';
const ManageProductsSeller = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        listProductSeller(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div style={{background:'#d6e7f5'}}>
        <Layout
        title="MarketPlace For AlphaD&D."
        description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
        className="container-fluid"
        />
<Particles height='800pxs'></Particles>
        <div style={{paddingTop:'50px',marginBottom:'10%'}} className='container'>
        <h2 className="text-center">
             Total Products : <span style={{color:'yellowgreen'}}> {products.length}</span>
                </h2>
             <hr />

             <div style={{padding:'7px',fontWeight:'600',backgroundColor:'#262626',color:'white',fontSize:'1.3rem',marginBottom:'3px'}} className='row'>
                 <span className='col-7'>Products</span>
                 <span style={{textAlign:'center'}}className='col-3'>Update</span>
                 <span style={{textAlign:'center'}}className='col-2'>Remove</span>
             </div>
            <div     className="row ">
                <div className="col-12">
                    
                   
                        {products.map((p, i) => (

                            <div key = {i} className = 'row Row-style'> 

                            <div className='col-7'>
                            <strong>{p.name}</strong>
                            </div>
                           
                                
                            <Link style={{textAlign:'center',cursor:'pointer'}} className='col-3 Edit-btn' to={`/seller/product/update/${p._id}`}>
                                <span>
                                    <i class="far fa-edit"></i>
                                </span>
                            </Link>
                                <span style={{textAlign:'center'}} className = 'col-2 Remove-btn'
                                    onClick={() => destroy(p._id)}
                                    
                                >
                                    <i style={{color:'red',cursor:'pointer'}} className="far fa-trash-alt "></i>
                                </span>

                            </div>
                        ))}
                   
                    <br />
                </div>
            </div>
            </div>
            <Footer></Footer>
            </div>
    );
};

export default ManageProductsSeller;