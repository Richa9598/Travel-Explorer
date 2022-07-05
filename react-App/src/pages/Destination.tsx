import React from 'react';

type DestinationProps = {
    destination: {
        id: number;
        des_distance: string;
        des_name: string;
        des_rating: number;

    };
    onDelete: (id: number) => void;
};

const Destination = (destination: DestinationProps) => {
    // console.log(destination);
    return (
        <tr>
            <td>{destination.destination.id}</td>
            <td>{destination.destination.des_name}</td>
            <td>{destination.destination.des_distance} KMs</td>
            <td>{destination.destination.des_rating} Stars</td>
            <td><button
                        // className='remove-task'
                        onClick={() => destination.onDelete(destination.destination.id)} // onClick handler to handle task by id
                    >X</button></td>

            
        </tr>
    );
};

export default Destination;