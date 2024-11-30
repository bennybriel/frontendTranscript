/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Container,
    Row,
    Col
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import React,{ useEffect, useState } from "react";
  import {useLocation,useHistory} from 'react-router-dom';
  import axios from "axios";

  
    const Confirmation = () =>
    {
      const baseUrl =process.env.REACT_APP_BASE_URL;
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const history = useHistory();
      useEffect(()=>{
      
         if(userDetails===null || userDetails==='' || userDetails==='undefined')
         {
             history.push('/auth/home')
         }
      },[]);
     


   
    const ContinueApplication=(e)=>
    {
        history.push('/admin/completeapplication'); 
    }
       
  return(
      <>
        <UserHeader />
        {/* Page content */}
      {/* { data && */}
        <Container className="mt--7" fluid>
          
            <Row>
            
                <Col className="order-xl-1" xl="10">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Payment Confirmation Page </h3>
                        </Col>
                        <Col className="text-right" xs="4">
                       
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    
                        <h6 className="heading-small text-muted mb-4">
                        User information 
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                        <Col lg="12">               
                             <FormGroup>
                              <label><b>Congratulations!!! Your Payment Was Successful </b></label>     
                               <p><Button className="mt-4" color="success"  onClick={() => ContinueApplication()}>Continue </Button></p>                                                 
                            </FormGroup>
                            </Col>
                        </Row>
                        <Col lg="3">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                </label>
                                <div className="text-center">
                                
                   
                    </div>
                            </FormGroup>
                            </Col>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                    
                    
                  
                    </CardBody>
                </Card>
                </Col>
            </Row>
         
        </Container>
     {/* } */}
      </>
    );
  };
  
  export default Confirmation;
  