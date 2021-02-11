import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import Footer from "../core/Footer";
import { getUser, updateCategory } from './apiAdmin';
import Particles from './Particles';
import './Particle.css';
import './UserProfile.css';
// {category: ["5cd0258f2793ec6e100bc191"], price: []}
// http://localhost:3000/admin/category/update/5cd0258f2793ec6e100bc191
const UserProfile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email:'',
        role:0,
        history:[],
        _id: '',
        error: '',
     
        
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    

    const init = userId => {
        getUser(userId, token).then(data => {
            
                // populate the state
                console.log(data);
                setValues({
                    ...values,
                    name: data.name,
                    email: data.email,
                    role:data.role,
                    _id: data._id
                });
            
        });
    };

    useEffect(() => {
        init(match.params.userId);
        console.log(match.params.userId);
    }, []);

    
    
        

    const u = () => {
        if(values.role == 0){
            return <h5>Status : Registered Buyer</h5>
        }else {
            return <h5>status : Registered Seller</h5>
        }
    }

    
    const goBackBTN = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/categories" className="text-info text-center">
                    Back To Admin Home
                </Link>
            </div>
        );
    };

    return (
        <div style={{background:'#d6e7f5',height :' 1000px'}}>
        <Layout
        title="MarketPlace For AlphaD&D."
        description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
        className="container-fluid"
       />
             <Particles  height ='500px'/>
            <div style ={{marginTop : '120px',marginBottom : '120px',padding :'4%',width :'25%',height:'30%', border:'2px solid yellowGreen'}} className='container  Profile-background' >
                
                     <h5>
                   
                    Name : {values.name}
                    </h5>
                    <h5>        
                   E-mail :    {values.email}
                    </h5>
                   {u()}
                   {goBackBTN()}
                   

               
            </div>
            <Footer></Footer>
     </div>
    );
};

export default UserProfile;