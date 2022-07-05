import React from 'react';

type TransportationProps = {
    transportation: {
        id: number;
        t_name: string;
        t_price: number;
        t_rating: number;
        t_description: string;
        t_capacity: number;
        
    };
    onDelete: (id: number) => void;
};

const Transportation = (transportation: TransportationProps) => {
    // console.log(destination);
    return (
        <tr>
            <td>{transportation.transportation.id}</td>
            <td>{transportation.transportation.t_name}</td>
            <td>{transportation.transportation.t_description.substring(0, 60)}...</td>
            <td>${transportation.transportation.t_price}</td>
            <td>{transportation.transportation.t_capacity} people</td>
            <td>{transportation.transportation.t_rating} Stars</td>
            <td><button
                        // className='remove-task'
                        onClick={() => transportation.onDelete(transportation.transportation.id)} // onClick handler to handle task by id
                    >X</button></td>
        </tr>
    );
};

export default Transportation;