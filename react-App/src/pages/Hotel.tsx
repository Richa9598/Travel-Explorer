import React, { useState, useEffect } from 'react';

type HotelProps = {
    hotel: {
        id: number;
        hotel_name: string;
        hotel_rating: number;
        hotel_price: number;
        des_id: number;
        
    };
    onDelete: (id: number) => void;
};

const Hotel = (hotel: HotelProps) => {
    return (
        <tr>
            <td>{hotel.hotel.id}</td>
            <td>{hotel.hotel.hotel_name}</td>
            <td>${hotel.hotel.hotel_price}</td>
            <td>{hotel.hotel.hotel_rating} Stars</td>
            <td>{hotel.hotel.des_id}</td>
            <td><button
                        onClick={() => hotel.onDelete(hotel.hotel.id)}
                    >X</button></td>
        </tr>
    );
};

export default Hotel;