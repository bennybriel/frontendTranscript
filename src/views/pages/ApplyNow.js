import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row, Select,
    Col
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import { ToastContainer, toast } from 'react-toastify';
  import React,{ useEffect, useState } from "react";
  import {useLocation,useHistory} from 'react-router-dom';
  import axios from "axios";
  import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
  import Spinner from '../Spinner';
  const ApplyNow = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var headers   = {'Content-Type': 'application/json','Authorization':'Bearer '+ userDetails.token,};
    useEffect(()=>{
    if(userDetails===null || userDetails==='' || userDetails==='undefined')
     {
         history.push('/auth/home')
     }
    },[]);
    const location = useLocation();
    const [options, setOptions] = useState([]);
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState([]);
    const [valuesCountry, setValueCountry] = useState([]);
    const [valuesState, setValueState] = useState([]);
    const [userinfo, setUserinfo] = useState([]);

    const matricno  =userDetails.data.matricno; //sessionStorage.getItem('matricno');
    const email     =userDetails.data.email; //sessionStorage.getItem('email')
    const name   = userDetails.data.name;//sessionStorage.getItem('surname');
    const othername = userDetails.data.Othernames;//sessionStorage.getItem('othername');
    const phone =    userDetails.data.phone;
    //const baseUrl =process.env.REACT_APP_BASE_URL;
    const baseUrl ="https://transcript1.lautech.edu.ng/api/v1/";
    const baseUrl_Payment ="https://icomess.lautech.edu.ng/index.php/payment/index/"; //process.env.REACT_APP_PAYMENT_URL;
    
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = (event) => {
      event.preventDefault();  // Prevents page refresh
      setModalOpen(!modalOpen);
  };


  //Fetch Programmes
    useEffect(() => { 
      fetch(`${baseUrl}programmes`, {headers})
      .then((data)=>data.json())
      .then((val)=>setValues(val.data))
      .catch((error) => console.log(error));
    },[]);
  
//Fetch Country
//const urlC ='http://localhost:5000/api/v1/country'
useEffect(() => { 
  fetch(`${baseUrl}country`,{headers})
  .then((data)=>data.json())
  .then((val)=>setValueCountry(val.data))
  .catch((error) => console.log(error));
},[]);

let handleCountryChange = (e) => {
  var value = e.target.value;
  LoadState(value);
}


function LoadState(value) 
{
   axios.get(`${baseUrl}getstates/${value}}`,{headers})
  .then((response)=>
  {
      //console.log(response.data.data);
      setValueState(response.data.data);  
  })
  .catch((err)=>{
    
      console.log(err);
  })  
};


const handleSubmit = (e) =>
{
  e.preventDefault();
  setLoading(true);

  // const url = 'http://localhost:8000/api/v1/transcripts/';


     const  state = e.target.state.value;
     const country= e.target.country.value;
     const category= e.target.category.value;
     var pid=0;
    const userData = 
    {
      email: e.target.email.value,
      password: e.target.matricno.value,
      matricno: e.target.matricno.value,
      programme: e.target.programme.value,
      state: state,
      country: country,
      name:    e.target.name.value,
      phone:e.target.phone.value,
      category: e.target.category.value
    };
    //console.log(userData);
    axios.post(`${baseUrl}addapplication`, userData,{headers}).then((response) =>
     {
      console.log(response);
      if(response.data.status === true)
      {
          window.location.href = baseUrl_Payment+response.data.trans_id
      }
    })
    .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });

};


const Category = [
  { value: 'Softcopy', label: 'Softcopy Only' },
  { value: 'Hardcopy', label: 'Hardcopy' },
//   { value: 'Student', label:  'Student Copy' }
 
];

    return (
        
      <>
         <UserHeader />
        {/* Page content */}
   
        <Container className="mt--7" fluid>
             <ToastContainer position="top-center"></ToastContainer>
            <Row>
            
                <Col className="order-xl-1" xl="10">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Transcript Application Page  [{ matricno }]</h3>
                        </Col>
                        <Col className="text-right" xs="4">
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <form onSubmit={handleSubmit}>
                        <h6 className="heading-small text-muted mb-4">
                        Applicant information [{ matricno }]
                        </h6>
                        <div className="pl-lg-4">
                    
                     
                     <Row>
                        <Col lg="3">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Matric No.
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="matricno"
                                type="text"
                                value={ matricno  }
                                placeholder="Applicant MatricNo"
                                name="matricno"
                                required 
                                readOnly
                                />
                            </FormGroup>
                            </Col>
                                <Col lg="6">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                    >
                                    Applicant Full Name
                                    </label>
                                    <Input
                                    className="form-control-alternative"                         
                                    id="name"
                                    type="text"
                                    placeholder="Full Name"
                                    name="name"
                                    required 
                                    
                                    />
                                </FormGroup>
                               
                               
                                </Col>
             
             
                   </Row>
                  


                       <Row>
                          
                            <Col lg="5">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Applicant Email
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="email"
                                type="email"
                                
                                placeholder="Applicant Email"
                                name="email"
                                required 
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="4">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Applicant Phone Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="phone"
                                placeholder="Applicant Phone Number"
                                type="text"
                                name="phone"
                                required 
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="3">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                               Transcript Type
                                </label>
                                <select name="category" id="category" className="form-control" required>
                                    <option value="">Select Transcript Type</option>
                                    {Category.length > 0 ? (
                                      Category.map((opts) => (
                                        <option key={opts.value} value={opts.value}>
                                          {opts.label}
                                        </option>
                                      ))
                                    ) : (
                                      <option disabled>No categories available</option>
                                    )}
                                  </select>
                            </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col lg="5">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Applicant Programme
                                </label>
                                <select name="programme" id="programme" className="form-control" required>
                                                {
                                                     values.map((opts,i)=><option key={i} value={opts.Department}>{opts.Department}</option>)
                                                }        
                                </select>
                            </FormGroup>
                            </Col>
                            <Col lg="4">
                            <FormGroup>
                                <label
                                 className="form-control-label"
                                 htmlFor="input-first-name"
                                 >
                                 Recipient Country
                                 </label>
                                 <select name="country" id="country" onChange={handleCountryChange} className="form-control" required>
                                               <option value="">Country</option>
                                               {
                                                      valuesCountry.map((item,i)=><option key={i} value={item.countryid}>{item.country}</option>)
                                                    
                                                      
                                               }  
                                             </select>
                            </FormGroup>
                            </Col>
                            <Col lg="3">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Recipient State
                                </label>
                                <select name="state" id="state" className="form-control" required>
                                             <option value="">State</option>
                                                {
                                                      valuesState.map((stat,i)=><option key={i}>{stat.state}</option>)
                                                }    
                                </select>
                            </FormGroup>
                            
                            </Col>
                            <Col lg="6">
                                 <FormGroup check>
                                  <label className="form-check-label" htmlFor="terms-checkbox">
                                      <input
                                          type="checkbox"
                                          id="terms-checkbox"
                                          className="form-check-input"
                                          name="termsCheckbox"
                                          required
                                      />
                                      I agree to the{' '}
                                      <a href="#" onClick={toggleModal}>
                                             Terms and Conditions
                                         </a>
                                  </label>
                                 </FormGroup>
                              </Col>
                        </Row>
                        
                        <Row>
                           
                            <Col lg="6">
                                <div className="text-center">
                                    {/* <Button className="mt-4" color="success" type="submit">
                                    Submit Application
                                </Button> */}
                                <Button className="mt-4" color="warning" type="submit">
                                       {loading ? (<Spinner/>) : ('Submit Application' )}</Button> 
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
     
      {/* Modal for Terms and Conditions */}
      <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-lg modal-dialog-centered">
                <ModalHeader toggle={toggleModal}>Terms and Conditions for Transcripts Application</ModalHeader>
                <ModalBody>
                    <p>
                        <b style={{ color: 'red' }}>These terms and conditions will govern the application process for Transcripts in the 
                          LADOKE AKINTOLA UNIVERSITY OF TECHNOLOGY, OGBOMOSO hereafter referred to as "the Institution".
                        </b>
                    </p>
                    <p>
                        <b style={{ color: 'black' }}>By submitting a transcript request, you agree to adhere to the policies outlined herein: </b>
                    </p>
                    <ol>
                        <li>
                            Transcripts can only be requested by current or former students of the Institution who 
                            have fulfilled all academic and financial obligations.
                        </li>
                        <li>
                            Transcripts will be issued only to:
                            <ul>
                                <li>Higher Educational Institutions</li>
                                <li>Credential/Documents Evaluation Agencies</li>
                                <li>Other approved academic-related organizations as deemed fit by the Registrar</li>
                            </ul>
                            <p>
                                Note: Personal requests for transcripts directed to individuals or third parties not 
                                listed above will not be processed as official transcripts.
                            </p>
                        </li>
                        <li>
                            Transcripts are available in the following formats:
                            <ul>
                                <li>Hard Copy: Courier to authorized recipients</li>
                                <li>Electronic Copy: Scanned and sent via secure electronic delivery to authorized recipients only</li>
                            </ul>
                        </li>
                        <li>
                            To initiate a Transcript request kindly follow the processes highlighted below:
                            <ol type="i">
                                <li>Log on to transcriptl.lautech.edu.ng;</li>
                                <li>Accept the terms and conditions;</li>
                                <li>Click on “apply now”;</li>
                                <li>Input your matriculation number; fill up the required details, Recipient State, and Country;</li>
                                <li>Click on either Hard copy, Student Copy, or Soft Copy;</li>
                                <li>Proceed to make payment as auto-calculated by the transcript application;</li>
                                <li>Refresh the page to confirm payment and click on “complete now” button;</li>
                                <li>Fill the other required details and then submit your application for transcript.</li>
                            </ol>
                        </li>
                        <li>
                            Transcript requests will be processed within 5-7 working days from the date of receipt of 
                            results from the Department. Please allow additional time for courier delivery and processing 
                            by the receiving Institution or agency.
                        </li>
                        <li>
                            Once a request has been submitted, changes or cancellations cannot be granted.
                        </li>
                        <li>
                            Transcript records are confidential and will be handled as such. By applying for a Transcript, 
                            you consent to the sharing of your academic records with the designated recipient(s).
                        </li>
                        <li>
                            The Institution will not be liable for any delay, errors, or complications arising from the 
                            department, processing, and delivery of transcripts, including those sent electronically.
                        </li>
                        <li>
                            The Institution reserves the right to amend these terms and conditions at any time without prior notice.
                        </li>
                        <li>
                            For questions or complaints regarding Transcript requests, please contact support@lautech.edu.ng
                        </li>
                    </ol>
                    <p>
                    <b style={{ color: 'red' }}>Note: If you want your transcripts sent to an evaluating agency such as WES, Dataflow, Sterling, 
                        SpanTran, etc., please ensure that you visit verify.lautech.edu.ng for the verification process, if needed.
                    </b></p>
                    <p> 
                    <b style={{ color: 'black' }}>
                        By submitting a request for Transcript, you acknowledge that you have read and understood the above 
                        terms and conditions and agree to comply with them. </b>
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>


      </>
    );
  };
  
  export default ApplyNow;
  