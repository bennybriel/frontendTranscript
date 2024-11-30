
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
  } from "reactstrap";
  import { useState } from 'react'
  import {useLocation,useHistory} from 'react-router-dom';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import axios from 'axios'

  const ConfirmPasscode = () =>
   {
  const location = useLocation();
  const[error, setError]= useState('');
  const [isLoggedIn, setIsLoggedIn]= useState(false)
  const history = useHistory();
  const matricno =location.state.matricno;
  const email =location.state.email;
  const baseUrl =process.env.REACT_APP_BASE_URL;
  //Load Userdata
 
  function LoadUserData(mat)
  {
          const url ='http://localhost:5000/api/v1/usersdata';
          const response = axios.post(url,{matricno: mat})
          .then((response)=>
          {
            sessionStorage.setItem('surname', response.data.surname)
            sessionStorage.setItem('othername', response.data.othernames)
            sessionStorage.setItem('phone', response.data.phone)
          })
          .catch((err)=>{
              
              console.log(err);
          })  
  }


  const handleSubmit = (e) =>
  {
    e.preventDefault(); 
       
      validate(e)
        const passcode = e.target.passcode.value;
       // console.log('Passcode '+ passcode)
        // const url  = 'http://localhost:5000/api/v1/confirmpasscode'
    
          axios.post(`${baseUrl}confirmpasscode`,{matricno,passcode})
          .then((response)=>
          {
           
             console.log(response.data);
           
             
              if(response.data===250) 
              {
                  toast.error('Invalid One Time Passcode');
                  setError(response.data.message); 
                  return;
                
              }
              if(response.status===200) 
              {
                 setError('');
                 setIsLoggedIn(true)
                 LoadUserData(matricno)  
                 sessionStorage.setItem('matricno', matricno)  
                 sessionStorage.setItem('email', email)         
                 history.push('/admin/index');
              }
            setError('');
  
            
          })
          .catch((err)=>{
            
              console.log(err);
  
          })  
  
  };
  

  const validate =(e)=>{
      let result = true;
      const passcode = e.target.passcode.value;
      if (passcode === null || passcode==='')
      {
        result = false;
        toast.error('Please Enter Your Passcode');
       
      }
      return result;
  }

    return (
      <>
      
          <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
            <ToastContainer position="top-center"></ToastContainer>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Please Confirm Your One Time Passcode</small>
                 {email &&  <div  className="alert alert-success"> One Time Passcode has been sent to { email } </div> }
                </div>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Enter One Time Passcode ." 
                        type="text" 
                        name="passcode"
                     
                        className="form-control"
                        id="passcode" 
                       
                      />
                    </InputGroup>
                  </FormGroup>
                
                
                  
                  <div className="text-center">
                    <Button className="mt-4" color="success" type="submit">
                    Confirm Passcode
                    </Button>
                    
                  {error &&   <div className="alert alert-danger">
                                                           { error }
                                                  </div>  
                  }
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
  
      </>
    );
  };
  
  export default ConfirmPasscode;
  