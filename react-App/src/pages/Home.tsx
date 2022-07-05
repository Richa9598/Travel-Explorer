import axios from 'axios';
import Testimonial from './Testimonials';
import ContactUSPage from './ContactUsPage';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Carousel, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import AddContactUs from './AddContactUs';


type Props = {};

type DestinationType = {
  id: number;
  des_distance: string;
  des_name: string;
  des_rating: number;
  name: string;
  feedback: string;

  };
  type TestimonialsType = {
    id: number,
    picture: string,
    name: string,
    comment: string,
    created_at: string,
};

const Home = (props: Props) => {
  const navigate = useNavigate();

  const [destination, setDestinations] = useState<DestinationType[]>([]);
  const [userfeedback, setfeedback] = useState<DestinationType[]>([]);
  const [userfeedback1, setfeedback1] = useState<DestinationType[]>([]);
  const [userfeedback2, setfeedback2] = useState<DestinationType[]>([]);
 
  const[testimonials,setTestimonials]=useState<TestimonialsType[]>([]);

  const sendGetRequestDestination = async () => {
    try {
      axios.defaults.baseURL = 'http://localhost:3000'
      console.log(axios.defaults.baseURL);
      const response = await axios.get(
        '/destinations'
      );
      console.log(response);
      setDestinations(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const sendGetRequestFeedback = async () => {
    try {
      axios.defaults.baseURL = 'http://localhost:3000'
      console.log(axios.defaults.baseURL);
      const response = await axios.get(
        '/userfeedback/1'
      );
      console.log(response);
      setfeedback(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const sendGetRequestFeedback1 = async () => {
    try {
      axios.defaults.baseURL = 'http://localhost:3000'
      console.log(axios.defaults.baseURL);
      const response = await axios.get(
        '/userfeedback/4'
      );
      console.log(response);
      setfeedback1(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const sendGetRequestFeedback2 = async () => {
    try {
      axios.defaults.baseURL = 'http://localhost:3000'
      console.log(axios.defaults.baseURL);
      const response = await axios.get(
        '/userfeedback/3'
      );
      console.log(response);
      setfeedback2(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
//// Testimonial traial 1
const sendGetRequest = async () => {
  try {
      axios.defaults.baseURL = 'http://localhost:3000'
      // console.log(axios.defaults.baseURL);
      const response = await axios.get(
          '/testimonial'
      );
      // console.log(response);
      setTestimonials(response.data);
      // console.log(response);
  } catch (err) {
      console.log(err);
  }
};
const sendDeleteRequest = async (id: number) => {
  try {
      axios.defaults.baseURL = 'http://localhost:3000'
      // console.log(axios.defaults.baseURL);
      const response = await axios.delete(
          '/testimonial/' + id
      );
      // console.log(response);
  } catch (err) {
      console.log(err);
  }
  sendGetRequest();
};
 
/////
  const handleSelect = (e: any) => {
    console.log(e.target.value);
    var id = e.target.value;
    navigate('/listings/' + id);

  }
  const sendPostOrPutRequest = async (id: number,contact_name: string,contact_country: string,contact_email: string,contact_feadback: string,) => {
        
    var found: boolean = false;
    console.log("ID IS "+id);

    if(!isNaN(id)){
        console.log("POSTING")
        console.log("Trying put");
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            console.log(axios.defaults.baseURL);
            const response = await axios.put(
                '/contact/' + id,
                { contact_name: contact_name, contact_country: contact_country, contact_email: contact_email, contact_feadback: contact_feadback}
            );
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("POSTING")
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.post(
                '/contact',
                { contact_name: contact_name, contact_country: contact_country, contact_email: contact_email, contact_feadback: contact_feadback }
            );
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
        
    }

    sendGetRequest();
};

  useEffect(() => {
    // console.log("Using effect");
    sendGetRequestDestination();
    sendGetRequestFeedback();
    sendGetRequestFeedback1();
    sendGetRequestFeedback2();
    sendGetRequest();
  }, []);
  return (
   
    <div className='container'>
      <div className="jumbotron text-center">
        <h1>Travel Explorer</h1>
        <p>Travel made easy</p>
        <form action="searchResult" method="post">
          <Container>
            <Row>
              <Col ></Col>

              <Col className="input-group">
                <select id="dest" name="dest" onChange={handleSelect} >
                  <option value="0">Select</option>
                  <option value="0">All Destinations</option>
                  {destination.map((destination) => (
                    <option key={destination.id} value={destination.id}>{destination.des_name}</option>
                  ))}

                </select>
                <input type="submit" value="Submit" className="btn btn-danger" ></input>
              </Col>
              <Col>
              </Col>
            </Row>
          </Container>
        </form>
      </div>

<br></br>
<br></br>

      <div>
        <Carousel className='HomeReviews'>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../images/reviews/feed1.jpg")}
                           alt="First slide"
            />
            <Carousel.Caption>
              <h1>User Feedback number 1</h1>
              {userfeedback.map((userfeedback) => (
               
                <option>My name is {userfeedback.name} and my feedback is : {userfeedback.feedback}</option>
              ))}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../images/reviews/feed2.jpg")}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h1>User Feedback number 2</h1>
              {userfeedback1.map((userfeedback1) => (
               
                <option>My name is {userfeedback1.name} and my feedback is : {userfeedback1.feedback}</option>
              ))}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../images/reviews/feed3.jpg")}
              alt="Third slide"
            />

<Carousel.Caption>
              <h1>User Feedback number 3</h1>
              {userfeedback2.map((userfeedback2) => (
               
                <option>My name is {userfeedback2.name} and my feedback is : {userfeedback2.feedback}</option>
              ))}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <br></br>
<br></br>

</div>
        

{/* Container (Contact us)  */}
            <div>
            <AddContactUs onAddContact={sendPostOrPutRequest} />
            </div>
     
    </div>


  );
};

export default Home;