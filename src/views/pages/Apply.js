// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col
  } from "reactstrap";
  import React, { useState, useEffect }  from 'react'
  import {useLocation,useHistory} from 'react-router-dom';
  import axios from 'axios';
  import { saveTokenInLocalStorage} from '../../services/AuthService';
  import Spinner from '../Spinner';
  const Apply = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [options, setOptions] = useState([]);
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const history = useHistory();
    const [values, setValues] = useState([]);
    const [valuesCountry, setValueCountry] = useState([]);
    const [valuesState, setValueState] = useState([]);
    const[error, setError]= useState('');
    const baseUrl ="https://transcript1.lautech.edu.ng/api/v1/";
    
      

  //Fetch Programmes
  useEffect(() => { 
    fetch(`${baseUrl}programmes`)
    .then((data)=>data.json())
    .then((val)=>setValues(val.data))
    .catch((error) => console.log(error));
  },[]);
  
  
//Fetch Country
// const urlC ='http://localhost:5000/api/v1/country'
useEffect(() => { 
  fetch(`${baseUrl}country`)
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
  // const urlS ='http://localhost:5000/api/v1/country/'+value;
   axios.get(`${baseUrl}getstates/${value}`)
  .then((response)=>
  {
      //console.log(response);
      setValueState(response.data.data);  
  })
  .catch((err)=>{
    
      console.log(err);
  })  
};

const handleSubmit = (e) =>
{
  setLoading(true);
  e.preventDefault();
  
  const matricno = e.target.matricno.value;

    const userData = 
    {
      email: e.target.email.value,
      password: e.target.matricno.value,
      matricno: e.target.matricno.value,
      name: e.target.surname.value,
      phone:e.target.phone.value,

    };
    axios.post(`${baseUrl}getapply`, userData).then((response) => {
      console.log(response);
      if(response.data.statuscode===1)
      {
        setError("Email entered already used, please use another email address"); 
        setLoading(false);
      }
      
      if(response.data.statuscode===0)
      {
        setIsLoggedIn(true)
        saveTokenInLocalStorage(response.data);
        history.push('/admin/index');
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


const validateEmail= (e) =>{
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    const { validate } = this.state;
  
    if (emailRegex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }
  
    this.setState({ validate });
  }



    return (
        
      <>
        <Col lg="6" md="8">

          <Card className="bg-secondary shadow border-0">
          
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
              <img
              alt="..."
              src={require("../../assets/img/brand/logo.png") }
            /><br/>
                <small><b>New Application</b></small>
              </div>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="matricno" 
                                                                
                                                                className="form-control"
                                                                id="matricno" 
                                                                required
                                                                value={sessionStorage.getItem('matricno')}
                                                                placeholder="Matriculation Number">
                                                    </Input>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Full Name" type="text" id="surname" name="surname"  required  />
                  </InputGroup>
                </FormGroup>

                {/* <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="othername" type="text"
                     id="othername" name="surname"
                   
                     required
                    />
                  </InputGroup>
                </FormGroup> */}

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <select name="programme" id="programme" className="form-control" required>
                                                {
                                                     values.map((opts,i)=><option key={i} value={opts.Department}>{opts.Department}</option>)
                                                }        
                    </select>

                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email" id="email"
                     
                      autoComplete="new-email" required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Phone Number"
                     type="text" name="phone"
                     id="phone"
                     required
                  
                    />
                  </InputGroup>
                </FormGroup>
                {/* <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                  
                    <label><b>Transcript Destination Country:</b>
                                            The reciepient Country is the country where the recipient body/organization/institution is situated e.g
                                            Nigeria
                                            Canada
                                            USA

                                            </label>
                                            <select name="country" id="country" onChange={handleCountryChange} className="form-control" required>
                                               <option value="">Country</option>
                                               {
                                                      valuesCountry.map((item,i)=>
                                                      <option key={i} value={item.countryid}>{item.country}</option>)
                                                    
                                                      
                                                }   

                                                
                                                 
                                             </select>
                  </InputGroup>
                </FormGroup>                                         
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                  <label><b>Transcript Destination State:</b>
                                                The recipient state in the state/region/district/province where the recipient body/organization/institution is situated e.g
                                                Oyo State
                                                Ontario
                                                Alberta

                                          </label>
                                            <select name="state" id="state" className="form-control" required>
                                             <option value="">State</option>
                                                {
                                                      valuesState.map((stat,i)=><option key={i}>{stat.state}</option>)
                                                }    
                                            </select>
                                      
                   
                  </InputGroup>
                </FormGroup>                               */}
                  <div className="text-center">
                  <Button className="mt-4" color="warning" type="submit">
                   
                   {loading ? (<Spinner/>) : ('Submit Application' )}
                   
                  </Button>
                  {error && <div className="alert alert-danger">{ error }</div> }
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  };
  
  export default Apply;
  