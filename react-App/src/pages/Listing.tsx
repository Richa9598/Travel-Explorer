import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';

type ListingProps = {
    listing: {
        trip: number;
        des_id: number;
        des_name: string;
        des_distance: number;
        des_rating: number;
        hotel_name: string;
        hotel_rating: number;
        hotel_price: number;
        t_name: string;
        t_price: number;
        t_rating: number;
        t_description: string;
        t_capacity: number;
        site_name: string;
        site_description: string;
        site_rating: number;
        site_price: number;
        img_url: string;

    };
};

const Listing = (ll: ListingProps) => {
    const navigate = useNavigate();

    const handleRating = (des: number, site:number, hotel:number) => {
        var stars:number = Number(((des+site+hotel)/3.0).toFixed(1));
        // if(stars>4) return  "<span style='font-size:300%;color:yellow;'>&starf;</span>";
        // else if(stars>3) return "<span style='font-size:300%;color:yellow;'>&starf;</span>";
        // else if(stars>2) return "&#9733;&#9733;&#9733;";
        // else if(stars>1) return "&#9733;&#9733;";
        // else return "&#9733;";
        return stars+" Stars"
    }

    const handlePricePerNigh = (site: number, hotel:number) => {
        return "$"+(site+hotel)+" per night";
    }

    function handleDistance(des_dis: number): string {
        return `${des_dis} KMs from Toronto`;
    }

    const handleListingClicked = (trip_id: number) => {
        return '/listingdetail/' + trip_id;
    }

    const handleImage = (url: string) => {
        // console.log(url);
        return require('../' + url);
    }

    const getTitle = (site: string, hotel: string) => {
        return (site + " with stay at " + hotel).substring(0, 50);
    }
    // console.log(destination);
    return (

        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img style={{ height: '10rem' }} variant="top" src={handleImage(ll.listing.img_url)} />
                <Card.Body>
                    <Card.Title>{getTitle(ll.listing.site_name, ll.listing.hotel_name)}</Card.Title>
                    <Card.Text>
                        {ll.listing.site_description.substring(0, 190)}...
                    </Card.Text>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{handleRating(ll.listing.des_rating, ll.listing.site_rating, ll.listing.hotel_rating)} for {handlePricePerNigh(ll.listing.site_price, ll.listing.hotel_price)}</ListGroup.Item>
                        <ListGroup.Item>{handleDistance(ll.listing.des_distance)}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="success" href={handleListingClicked(ll.listing.trip)}>Details</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Listing;