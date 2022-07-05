import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

type BookingsType = {
    id: number;
    trip_id: number;
    start_date: string;
    end_date: string;
};

const Bookings = () => {


    const [bookings, setBooking] = useState<BookingsType[]>([]);

    const cardShadowPadding = {
        marginTop: "20px",
        padding: "40px",
        fontFamily: "Arial",
        boxShadow: "5px 5px 10px #888888"
    };

    const sendGetRequest = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/book'
            );
            // console.log(response);
            setBooking(response.data);
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
    };


    


    useEffect(() => {
        sendGetRequest();
    }, []);
    return (
        <div>
            <div className='container' style={cardShadowPadding}>
                <Table>
                    <thead>
                       <th>User ID</th> 
                       <th>Trip ID</th>
                       <th>Start Date</th>
                       <th>End Date</th>
                    </thead>
                    <tbody>
                        {/* <button onClick={sendPutRequest}>Update Post</button>*/}
                        {bookings.map((booking) => (<tr><td>{booking.id}</td><td>{booking.trip_id}</td><td>{booking.start_date}</td><td>{booking.end_date}</td></tr>))}
                    </tbody>

                </Table>
                
            </div>
        </div>
    );
};


export default Bookings;