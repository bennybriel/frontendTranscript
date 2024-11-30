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
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import React, { useState, useEffect }  from 'react'
  import axios from "axios";
  import {useLocation,useHistory} from 'react-router-dom';
  import dateFormat from "dateformat";
   const baseUrl ="https://transcript1.lautech.edu.ng/api/v1/";
   
   //process.env.REACT_APP_BASE_URL;
  const AppList = () => 
  {
    const [data, setData] = useState([]);
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const matricno = userDetails.matricno;
    var headers   = {'Content-Type': 'application/json','Authorization':'Bearer '+ userDetails.token,};
    const history  = useHistory();
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
 const loaddata = async(mat)=>
 {
      
      const response =await axios.post(`${baseUrl}transcriptrecord`,{matricno: matricno},{headers});
      //console.log(response);
      setData(response.data.data)
 };
 

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Completed Applications</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">SN</th>
                      <th scope="col">TranscriptID</th>
                      <th scope="col">TransactionID</th>
                      <th scope="col">Matric.No</th>
                      <th scope="col">Company</th>
                      <th scope="col">Contact Person</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Country</th>
                      <th scope="col">State</th>
                      <th scope="col">Date</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  { data && data.map((item,i)=>
                                                      
                    <tr key={item.guid}>
                     
                      <td> { ++i }</td>
                      <td>
                       { item.TranscriptID }
                      </td>
                      <td>
                       { item.paymentref }
                      </td>
                      <td>
                       { item.matricno}
                      </td>
                      <td>
                      { item.Organization}
                      </td>
                      <td>
                      { item.ContactPerson}
                      </td>
                      <td className="text-right">
                      { item.Address1	}  { item.Address2	}
                      </td>
                      
                      <td className="text-right">
                         { item.ContactEmail	}
                      </td>
                      <td className="text-right">
                         { item.ContactPhone	}
                      </td>
                      <td className="text-right">
                         { item.Country	}
                      </td>
                      <td className="text-right">
                         { item.State	}
                      </td>
                      <td className="text-right">
                         {dateFormat(item.created_at, "dd-mm-yyyy,hh:mm:ss TT")}
                      </td>
                    </tr>
               )}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        
        </Container>
      </>
    );
  };
  
  export default AppList;
  