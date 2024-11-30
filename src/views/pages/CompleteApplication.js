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
  import { ToastContainer, toast } from 'react-toastify';
  import React,{ useEffect, useState } from "react";
  import {useLocation,useHistory,} from 'react-router-dom';
  import axios from "axios";
  import FormData from 'form-data'


  const CompleteApplication = (pros) => 
  {
    //const baseUrl =process.env.REACT_APP_BASE_URL;
    const payment_Url ="https://gateway.lautech.edu.ng/index.php/payment/index/"; 
    const baseUrl ="https://transcript1.lautech.edu.ng/api/v1/";
    const baseUrl_Payment ="https://gateway.lautech.edu.ng/index.php/payment/index/"; 
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var headers   = {'Content-Type': 'application/json','Authorization':'Bearer '+ userDetails.token,};
    const matricno = userDetails.matricno;

    useEffect(()=>{
    if(userDetails===null || userDetails==='' || userDetails==='undefined')
     {
         history.push('/auth/home')
     }
    },[]);
    const [data, setData] = useState([]);
    const [pay, setPay] = useState([]);
    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState("");
    const [singledata, setSingleData] = useState([]);
   
    // const location = useLocation();
    // const { guid } = location.state;
    // console.log(guid);
    //Check payment status
    const guid = sessionStorage.getItem("guid")
    const history = useHistory();
    const location = useLocation();
    useEffect(() =>{ 
        fetchdata(guid);
      },[]);
    const fetchdata = async(mat)=>
    {
         const response =await axios.get(`${baseUrl}getoneapplicantinfo/${guid}`,{headers});
         setSingleData(response.data.data[0])
    };
    const saveFile = (e) => {
        
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    //    console.log(e.target.files[0])
      };     
      const names = userDetails.data.name;
    const handleSubmit = async  (e) =>
    {
        e.preventDefault();
      
        const matricno  = userDetails.matricno;
        const paymentref =  singledata.transactionid;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const address1  = e.target.address1.value;
        const address2 = e.target.address2.value;
        const contactperson = e.target.contactname.value;
        const organization = e.target.names.value;
       
        // const tlabel = e.target.file.value;

      


        axios.post(`${baseUrl}completeapplications`,{names,matricno,email,phone, contactperson, organization,paymentref, address1, address2}, { headers })
         .then((response) =>
          {
             console.log(response);
            const { statuscode, message, info } = response.data;
            if (statuscode === 0) 
            {
                history.push({
                    pathname: '/admin/successful',
                    state: { info }
                  });
            } else if (statuscode === 1) {
                toast.error("Sorry, TransactionID Already Used!");
            } else if (statuscode === 2) {
                toast.error("Sorry, No Successful Payment For The TransactionID!");
            }
          })
          .catch((error) => {
              if (error.response) 
              {
                //console.log(error.response);
                //console.log("server responded");
              } else if (error.request) {
                //console.log(error);
              } else {
                //console.log(error);
              }
            });
      
            
    }   

   
   return(
      <>
        <UserHeader />
        {/* Page content */}
      { data &&
        <Container className="mt--7" fluid>
             <ToastContainer position="top-center"></ToastContainer>
            <Row>
            
                <Col className="order-xl-1" xl="10">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Complete Application Page  [{ matricno }]</h3>
                        </Col>
                        <Col className="text-right" xs="4">
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <form onSubmit={handleSubmit}>
                        <h6 className="heading-small text-muted mb-4">
                        User information [{ matricno }][{ names }]
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                Company/Organization Name
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    name="names"
                                    id="names"
                                    placeholder="Organization Name"
                                    type="text"
                                    required 
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-email"
                                >
                                Receipients Contact Person
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="contactname"
                                placeholder="Receipients Contact Person"
                                type="text"
                                name="contactname"
                                required 
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
                                Receipient Email
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="email"
                                type="email"
                              
                                placeholder="Receipient Email"
                                name="email"
                                required 
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Receipient Phone Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="phone"
                                placeholder="Receipient Phone Number"
                                type="text"
                                name="phone"
                               
                                required 
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
                                Receipient Address 1
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="address1"
                                type="text"
                               
                                placeholder="Receipient Address 1"
                                name="address1"
                                required 
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                 className="form-control-label"
                                 htmlFor="input-first-name"
                                 >
                                 Receipient Address 2
                                 </label>
                                 <Input
                                 className="form-control-alternative"                         
                                 id="address2"
                                 type="text"
                               
                                 placeholder="Receipient Address 2"
                                 name="address2"
                                
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
                                Receipient Country
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="country"
                                type="text"
                                value={singledata.country}   
                                name="country"
                                readOnly
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="3">
                            <FormGroup>
                                <label
                                 className="form-control-label"
                                 htmlFor="input-first-name"
                                 >
                                 State
                                 </label>
                                 <Input
                                 className="form-control-alternative"                         
                                 id="state"
                                 type="text"
                                 value={ singledata.state }
                                 name="state"
                                 readOnly
                                />
                            </FormGroup>
                            </Col>

                            <Col lg="3">
                            <FormGroup>
                                <label
                                 className="form-control-label"
                                 htmlFor="input-first-name"
                                 >
                                 TransactionID
                                 </label>
                                 <Input
                                 className="form-control-alternative"                         
                                 id="transactionID"
                                 type="text"
                                 value={ singledata.transactionid }
                                 name="transactionID"
                                 readOnly
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Transcript Label(Optional)
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="file"
                                type="file"
                                onChange={(e)=>{ setFile(e.target.files[0]);}}
                                name="file"
                                
                                />
                            </FormGroup>
                            </Col> */}
                            <Col lg="6">
                                <div className="text-center">
                                    <Button className="mt-4" color="success" type="submit">
                                    Submit Application
                                </Button>
                                </div>
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
  
  export default CompleteApplication;
  