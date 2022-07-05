import React from 'react';
import { Button, Container, Nav } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'reactstrap';

type TestimonialsProps = {
    testimonial: {
        id: number,
        picture: string,
        name: string,
        comment: string,
        created_at: string,
        
    };
    onDelete: (id: number) => void;
};
const Testimonial = (testimonial: TestimonialsProps) => {
  const handleImage = (url: string) => {
    // console.log(url);
    return require('../images/' + url);
}
    
    
console.log(testimonial.testimonial.id);
    // console.log(destination);
    return (
        
        <Card className="bg-dark text-white">
          <Card.Img src={handleImage(testimonial.testimonial.picture)} alt="Card image" />
         <Card.ImgOverlay>
        <Card.Header>
        <Card.Title> {testimonial.testimonial.name}</Card.Title>
        </Card.Header>
        <Card.Body>
        
          <Card.Text>
         Comments : {testimonial.testimonial.comment} <br></br>
          
          Date : {testimonial.testimonial.created_at} <br></br>
         
          </Card.Text>
         
        </Card.Body>
        </Card.ImgOverlay>
      </Card>
        
    );
};

export default Testimonial;