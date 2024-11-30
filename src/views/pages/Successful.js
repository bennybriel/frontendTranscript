import React, { useEffect } from "react";
import { 
  Button, Card, CardHeader, CardBody, FormGroup, Container, Row, Col 
} from "reactstrap";
import { useLocation, useHistory } from "react-router-dom";
import UserHeader from "components/Headers/UserHeader.js";
// Custom CSS for print styles

const Confirmation = () => {
  const history = useHistory();
  const location = useLocation();
  const info = location.state?.info;
  console.log(info);
   useEffect(() => {
      window.print();  // Trigger the print dialog as soon as the page loads
  }, [history]);
  // Assuming 'info' is passed via route state

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);  // Create a Date object from the string
    
    // Extract and format the date part
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');  // getMonth() is 0-based
    const year = date.getFullYear();
  
    // Extract and format the time part
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';  // Determine AM/PM
    
    hours = hours % 12 || 12;  // Convert to 12-hour format, ensuring 0 becomes 12
    hours = String(hours).padStart(2, '0');  // Add leading 0 if needed
  
    // Return formatted date and time as dd-mm-yyyy hh:mm:ss A
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  };
  
  
  // Usage example
  const formattedDate = formatDateTime(info.created_at);
  //console.log(formattedDate);  // Output: 06-10-2024
  

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="10">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Application Confirmation Page</h3>
              </CardHeader>
              <CardBody>
                <h6 className="heading-small text-muted mb-4">
                  Application Submitted Successfully
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    {[
                      { label: "Full name", value: info.name },
                      { label: "Transcript ID", value: info.transcriptid },
                      { label: "Matric No", value: info.matricno },
                      { label: "Email", value: info.email },
                      { label: "Phone", value: info.phone },
                      { label: "Programme", value: info.programme },
                      { label: "Organization", value: info.organization },
                      { label: "Contact Person", value: info.contactperson },
                      { label: "Recipient Email", value: info.remail },
                      { label: "Recipient Phone", value: info.rphone },
                      { label: "Recipient Address 1", value: info.address1 },
                      { label: "Recipient Address 2", value: info.address2},
                      { label: "Recipient State", value: info.state },
                      { label: "Recipient Country", value: info.country },
                      { label: "Transaction ID", value: info.paymentref },
                      { label: "Date Submitted", value: formattedDate }
                    ].map(({ label, value }, index) => (
                      <Col lg="6" key={index}>
                        <FormGroup>
                          <label><b>{label}</b>: {value}</label>
                        </FormGroup>
                      </Col>
                    ))}
                  </Row>
                </div>
                <hr className="my-4" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Confirmation;
