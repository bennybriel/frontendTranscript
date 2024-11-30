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
import React, { useState, useEffect }  from 'react'
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "components/Headers/Header.js";
import {useHistory} from 'react-router-dom';
import dateFormat from "dateformat";
import axios from "axios";
  const Index = (props) => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singledata, setSingleData] = useState([]);
  //const baseUrl =process.env.REACT_APP_BASE_URL;
  const baseUrl ="https://transcript1.lautech.edu.ng/api/v1/"; 
  const baseUrl_Payment =  "https://icomess.lautech.edu.ng/index.php/payment/index/"; //process.env.REACT_APP_PAYMENT_URL;
  
  var headers   = {'Content-Type': 'application/json','Authorization':'Bearer '+ userDetails.token,};
  const matricno = userDetails.matricno;

  useEffect(()=>{
   
     if(userDetails===null || userDetails==='' || userDetails==='undefined')
     {
         history.push('/auth/home')
     }
  },[]);

  useEffect(() =>{ 
    loaddata(matricno);
  },[]);

//Fetch Applicant Records
const loaddata = async(matricno)=>
{
     const response =await axios.post(`${baseUrl}getAllPaymentsPaid`,{matricno : matricno},{headers});
     setData(response.data.data)
};

   const deleteRecord = (guid) => 
   {
        
        if(window.confirm('Are you sure you want to cancel this record'))
        {
            //  const url ='http://localhost:5000/api/v1/deleteapplication/'+gid;  
             const response = axios.get(`${baseUrl}deleteapplication/${guid}`,{headers});             
             toast.success("Transcript was successfully deleted")
             setTimeout(() => loaddata(matricno), 500)
             //window.location.reload();
        };
   }
   const fetchdata = async(guid)=>
   {
        const response =await axios.get(`${baseUrl}getoneapplicantinfo/${guid}`,{headers});
        //console.log(response)
        setSingleData(response.data.data[0])
        //console.log(response.data.data[0])
   };
   const payNow = async(guid) => 
   {
      //fetchdata(guid);
        const response = await axios.get(`${baseUrl}getoneapplicantinfo/${guid}`,{headers});
        var pid=0;
        const userData = 
        {
          email: response.data.data[0].email,
          matricno: response.data.data[0].matricno,
          programme: response.data.data[0].programme,
          state: response.data.data[0].state,
          country: response.data.data[0].countryid,
          names:    response.data.data[0].name,
          guid: guid,
          // othername:  e.target.othername.value,
          ///phone:e.target.phone.value,
        };
        //console.log(userData);
        axios.post(`${baseUrl}makepayments`, userData,{headers}).then((response) =>
        {
          console.log(response);
          if(response.data.status === true)
          {
              window.location.href = baseUrl_Payment+response.data.trans_id
          }
        })
        .catch((error) => {
            if (error.response) {
              //console.log(error.response);
              //console.log("server responded");
            } else if (error.request) {
             // console.log("network error");
            } else {
             // console.log(error);
            }
          });

   };

   const completeApp = (gid) => 
   {
      sessionStorage.removeItem("guid");
      sessionStorage.setItem('guid', gid);
      history.push('/admin/completeapplication',{ guid: gid });
   };
  return (
    <>
      <Header />
      {/* Page content */}
      <ToastContainer position="top-center"></ToastContainer>
      <Container className="mt--7" fluid>
        <Row>
        
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Transcript Record</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Not Completed
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                  <th scope="col">SN</th>
                    <th scope="col">Action</th>
                  
                    <th scope="col">Matric.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Programme</th>
                    <th scope="col">State</th>
                    <th scope="col">Country</th>
                    <th scope="col">TID</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Date</th>
                   
                  </tr>
                </thead>
                
                <tbody>
                  
                {data && data.map((item,i)=>
                                                      
                    <tr key={item.guid}>
                        <td> {++i}</td>
                       <td>
                       {item.ispaid===1 && item.isused == 0  && <Button  color="success"  onClick={(e) => completeApp(item.guid)}  size="sm">
                        Complete Now
                        </Button> 
                       }
                    
                     {item.ispaid===0
                      &&
                        <Button
                        color="success"
                      
                        onClick={() => payNow(item.guid)}
                        size="sm"
                      >
                     
                    
                      Pay Now
                      </Button> 
                    }
                     {item.ispaid===0  &&
                      <Button
                      color="danger"
                    
                      onClick={() =>deleteRecord(item.guid)}
                      size="sm"
                    >
                      Cancel
                    </Button>
                    }
                      </td>
                    
                      <td>{item.matricno}</td>
                      <td>{item.ApplicantName}</td>
                      <td>{item.ApplicantEmail}</td>
                      <td>{item.ApplicantPhone}</td>
                      <td>{item.programme}</td>
                      <td>{item.State}</td>
                      <td>{item.Country}</td>
                      <td>{item.transactionid}</td>
                      <td>{item.ispaid==true && <b>Success</b>} {item.ispaid==false && <b color={'#db261e'}>Failed</b>}</td>
                      <td>{
                        dateFormat(item.created_at, "dd-mm-yyyy,hh:mm:ss TT")
                      }</td>
                      

                    </tr>
                    
                  )
                 } 
                </tbody>
              </Table>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Index;
