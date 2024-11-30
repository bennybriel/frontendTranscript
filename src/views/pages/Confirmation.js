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
      //const baseUrl =process.env.REACT_APP_BASE_URL;
      const payment_Url ="https://gateway.lautech.edu.ng/index.php/payment/index/"; 
      const baseUrl ="https://transcript1.lautech.edu.ng/api/v1/";
      const baseUrl_Payment ="https://gateway.lautech.edu.ng/index.php/payment/index/"; 
      useEffect(()=>{
        let username = sessionStorage.getItem('matricno');
         if(username===null || username==='' || username==='undefined')
         {
             history.push('/auth/home')
         }
      },[]);
     
      const guid = sessionStorage.getItem("guid");
      console.log(guid)
        const [data, setData] = useState([]);
        const history = useHistory();
        const location = useLocation();
        useEffect(() =>{ 
          confirmPayment(guid);
          },[]);
        
        //Fetch Payment Records
        const confirmPayment = async()=>
        {
            //  const url ='http://localhost:5000/api/v1/confirmation/'+guid;

             const response =await axios.get(`${baseUrl}confirmation/${guid}`);
             //console.log(response)
             setData(response.data)
        };
         
 

    const CheckTransactionStatus = (e) =>
    {
      window.location.reload();
    }   
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
                              { data.status==='Approved Successful'  && <label>Congratulations!! Your Payment  With Transcript ID <b>{ data.trans_ref } </b> Was Returns <b>{ data.status }</b></label>     
                                           
                              }
                              { data.status==='Approved Successful' &&  <p><Button className="mt-4" color="success"  onClick={() => ContinueApplication()}>
                                          Continue
                                     </Button></p>                     
                              }
                            
                               { data.status!=='Approved Successful' 
                                &&
                                     
                                      <label style={{COlor:"red" }}>Sorry!!,  Your Payment  With Transcript ID <b>{ data.trans_ref }</b>  Returns  <b>{ data.status }</b> Please  click check status now!!! </label>   
                           
                                                     
                              }
                              { data.status!=='Approved Successful' 
                                &&
                                     <p>

                                  <Button  color="danger"
                                                      
                                                        onClick={() => CheckTransactionStatus()}
                                                        className="mt-4"
                                   >
                      
                                     Check Status Now
                                 </Button>
                                     </p>
                                                            
                              }
                             
                            </FormGroup>
                            </Col>

                            
                            <Col lg="6">
                            <FormGroup>
                               
                              
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
  