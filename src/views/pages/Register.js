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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { useState } from 'react'
import { useHistory,Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import qs from 'qs';
import { saveTokenInLocalStorage} from '../../services/AuthService';
import Spinner from '../Spinner';
const Register = () => 
{
  const initialValue = 
  {
    matricno: '',
  };

const baseUrl ="https://transcript1.lautech.edu.ng/api/v1/"; //process.env.REACT_APP_BASE_URL;

const[error, setError]= useState('');
const [formData, setFormData]= useState(initialValue);
const history = useHistory();
const [loading, setLoading] = useState(false);
const handleSubmit = (e) =>
{
  e.preventDefault();
  setLoading(true);
   validate(e);
  const matricno = e.target.matricno.value;
  var headers = 
  {
    'content-type': 'application/json',
  };
    
     
       axios.post(`${baseUrl}getregistration`, { 'matricno': matricno},{headers}).then((response)=>
        {
         
          if(response.data.statuscode ===1) 
          {
            setError("Please Supply Valid Student Matriculation Number"); 
            setLoading(false);
            sessionStorage.setItem('matricno',e.target.matricno.value );
            history.push('/auth/apply'); 
          }
          if(response.data.statuscode ===0) 
          {     
              saveTokenInLocalStorage(response.data);
              history.push('/admin/index'); 
                //ConfirmApplication(matricno,response.data.data.Surname,response.data.data.Othernames)
          } 
          setError(''); 
        })
        .catch((err)=>{ 
            console.log(err);
        })  

};

function ConfirmApplication(mat,sname,oname)
{
  // const url = 'http://localhost:5000/api/v1/apply';  
  axios.post(`${baseUrl}apply`,{ matricno:mat})
  .then((response)=>
  {
      if(response.data.statuscode===1) 
      {
          history.push('/auth/confirmpasscode',{matricno:mat, email:response.data[0].email});  
      }
   //  if(response.data.length ===0)
    else  
     {
       
         history.push('/auth/apply',{surname: sname, 
                                     othername:oname,
                                     matricno:mat,
                                    });
      }
    setError('');

    
  })
  .catch((err)=>{
    
      console.log(err);

  })  

}

const validate =(e)=>{
  let result = true;
  const mat = e.target.matricno.value;
  if (mat === null || mat==='')
  {
    result = false;
    toast.error('Please Enter Your Matric Number');
   
  }
  return result;
}

  return (
    <>
      
        <Col lg="5" md="8" >
          <Card className="bg-secondary shadow border-0" style={{ margin: '10px' }}>
          <ToastContainer position="top-center"></ToastContainer>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Please Enter Your Matric. NO</small>
              </div>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Matriculation No." 
                      type="text" 
                      name="matricno"
                      value={formData.matricno} 
                      className="form-control"
                      id="matricno" 
                      onChange={(e) =>setFormData({...formData, matricno: e.target.value})}
                    />
                  </InputGroup>
                </FormGroup>
              
              
                
                <div className="text-center">
                  <Button className="mt-4" color="warning" type="submit">
                  {loading ? (<Spinner/>) : ('SIGN IN' )}</Button> 
                  {error && <div className="alert alert-danger">{ error }</div> }
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>

    </>
  );
};

export default Register;
