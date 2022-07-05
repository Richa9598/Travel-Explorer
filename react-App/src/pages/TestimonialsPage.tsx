import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Testimonial from './Testimonials';
const { v4: uuidv4 } = require('uuid');

type TestimonialsType = {
    id: number,
    picture: string,
    name: string,
    comment: string,
    created_at: string,
};

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState<TestimonialsType[]>([]);

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

    

   

    useEffect(() => {
        // console.log("Using effect");
        sendGetRequest();
    }, []);
    return (
        <div>
                {/* <button onClick={sendPutRequest}>Update Post</button>*/}
                {testimonials.map((testimonials) => (
                    <Testimonial
                        onDelete={sendDeleteRequest} testimonial={testimonials} key={testimonials.id} />
                ))}
            </div>

    );
};


export default TestimonialsPage;
    