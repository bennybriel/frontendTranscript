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
    Form,
    Input,
    Container,
    Row,
    Col
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import React,{ useEffect, useState } from "react";
  import {useLocation} from 'react-router-dom';
  import axios from "axios";
 import { useHistory } from "react-router-dom";
  const name1    = sessionStorage.getItem("surname");
  const name2    = sessionStorage.getItem("othername");
  const matricno = sessionStorage.getItem("matricno");


  var name = name1 + ' ' + name2;
  
  //const baseUrl= process.env.REACT_APP_BASE_URL;

  //process.env.REACT_APP_PAYMENT_URL;
  //console.log(payment_Url)
  const Prepay = () => 
  {
    const payment_Url ="https://gateway.lautech.edu.ng/index.php/payment/index/"; 
    const baseUrl ="https://transcript1.lautech.edu.ng/api/v1/";
    const baseUrl_Payment ="https://gateway.lautech.edu.ng/index.php/payment/index/"; //process.env.REACT_APP_PAYMENT_URL;
    
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var headers   = {'Content-Type': 'application/json','Authorization':'Bearer '+ userDetails.token,};
    const history=useHistory()
    useEffect(()=>{
   
      if(userDetails===null || userDetails==='' || userDetails==='undefined')
      {
          history.push('/auth/home')
      }
   },[]);
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState();

    const guid     = sessionStorage.getItem("guid");
    const pid     = sessionStorage.getItem("pid");
    const names  = userDetails.data.Surname +' ' + userDetails.data.Othernames;

    const ema = sessionStorage.getItem("email");
    const matricno = userDetails.matricno;
    useEffect((guid) =>{ 
        fetchdata(guid);
      },[]);
    
    
    //Fetch Applicant Records
    const fetchdata = async()=>
    {
         const response =await axios.get(`${baseUrl}getoneapplicantinfo/${guid}`);
         setData(response.data.data)
    };

    const fetchPrice = async()=>
    {
         const response =await axios.get(`${baseUrl}getproduct/${pid}`);
        // console.log(response);
         setAmount(response.data[0].amount);
         setProducts(response.data)
    };
    
    useEffect(() => { 
        fetchPrice()
    },[]);
    

    //console.log(amount);
   
    const handleSubmit = (e) =>
    {
       // alert('Submit')/:mat/:des/:amt/:pid/:gid/
        e.preventDefault();
        const mat = matricno
        const des ="Transcript Application"
        var  amt = amount;
        var gid = guid;

        // const url = "http://localhost:5000/api/v1/payments/";
        axios.post(`${baseUrl}payments/`, {
          pid,
          mat,
          des,
          ema,
          gid,
          amt,
        },{headers})
         .then((response) =>
         {
              
                if(response.status===200)
                {
                  window.location.href = payment_Url+response.data.trans_id
                }
          })
          .catch((error) => {
              if (error.response) 
              {
                console.log(error.response);
                console.log("server responded");
              } else if (error.request) {
                console.log(error);
              } else {
                console.log(error);
              }
            });
      
            
   }   

   
   return(
      <>
        <UserHeader />
        {/* Page content */}
      { data &&
        <Container className="mt--7" fluid>
          
            <Row>
            
                <Col className="order-xl-1" xl="10">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Payment Page  [{ matricno }]</h3>
                        </Col>
                        <Col className="text-right" xs="4">
                        {/* <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                        >
                            Settings
                        </Button> */}
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <form onSubmit={handleSubmit}>
                        <h6 className="heading-small text-muted mb-4">
                        User information [{ matricno }]
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                Fullname
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="names"
                                value={names}
                                id="names"
                                placeholder="Full name"
                                type="text" readOnly
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-email"
                                >
                                Programme
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="programme"
                                value={data.programme}
                                placeholder=""
                                type="text"
                                name="programme"
                                readOnly
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Country
                                </label>
                                <Input
                                className="form-control-alternative"
                                
                                id="country"
                                type="text"
                                value={data.country}
                                name="country"
                                readOnly
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                State
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="state"
                                placeholder=""
                                type="text"
                                name="state"
                                value={data.state}
                                readOnly
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col lg="4">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Amount To Pay  
                                </label>
                                
                            </FormGroup>

                            </Col>
                            <Col lg="0">
                                 {products &&  <label>&#8358;{ products[0].amount} </label>   }
                            </Col> */}
                            <Col lg="3">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                </label>
                                <div className="text-center">
                                  <Button className="mt-4" color="success" type="submit">
                                Pay Now &#8358;{amount}
                    </Button>
                    {/* {error &&
                        <div className="alert alert-danger">
                                                            { error }
                                                    </div>  
                        } */}
                    </div>
                            </FormGroup>
                            </Col>
                        </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                    
                    
                    </form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
         
        </Container>
     }
      </>
    );
  };
  
  export default Prepay;
  