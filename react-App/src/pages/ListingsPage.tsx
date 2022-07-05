import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { PureComponent, useContext, useEffect, useState } from 'react';
import Listing from './Listing';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

type Props = {};

type ListingType = {
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






const ListingsPage = () => {
    // console.log(useParams().id);
    const navigate = useNavigate();
    var id = useParams().id;
    const [listing, setListing] = useState<ListingType[]>([]);
    const [filteredListing, setFilteredListing] = useState<ListingType[]>([]);
    const [originalListing, setOriginalListing] = useState<ListingType[]>([]);
    
    const [search, setNewSearch] = useState("");
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(99999);
    const [ratingVal, setRating] = useState(0);
    const [distanceVal, setDistanceVal] = useState(5000);
    const [resetRating, setResetRating] = useState(0);
    const [resetPrice, setResetPrice] = useState(0);


    const margin = {
        margin: "5px",
    };

    const cardShadowPadding = {
        marginTop: "20px",
        padding: "40px",
        fontFamily: "Arial",
        boxShadow: "5px 10px 8px #888888"
    };

    const cardShadowPaddingImg = {
        marginTop: "20px",
        padding: "40px",
        boxShadow: "5px 10px 8px #888888",
        width: "80%"

    };

    const centerCropped = {
        width: "300px",
        height: "600px",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
    };


    var min:number = 0;
    var max:number = 99999;
    var rating:number = 0;
    var distance:number = 10000;

    const sendGetRequest = async () => {
        try {

            axios.defaults.baseURL = 'http://localhost:3000'
            console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/listings/' + id
            );
            console.log("TRYING Listings");
            console.log(response.data);
            setListing(response.data);
            setFilteredListing(response.data);
            setOriginalListing(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let updateList = [...filteredListing];
        setListing(updateList);
        setNewSearch(e.target.value);
        const filtered = (search.length==0) ? [...filteredListing] : updateList.filter((listing) =>
            listing.site_name.toLowerCase().includes(search.toLowerCase())
        );
        setListing(filtered);
    };

    

    const handleStarRating = (e: any) => {
        rating = e.target.value;   
        setRating(rating);  
        setResetRating(rating);
    }
    const handlePriceBracket = (e: any) => {
        var bracket = e.target.value;
        if(bracket == "0"){min = 0; max = 99999}
        else if(bracket == "1"){min = 50; max = 100}
        else if(bracket == "2"){min = 101; max = 200}
        else if(bracket == "3"){min = 201; max = 350}
        else if(bracket == "4"){min = 351; max = 500}
        else if(bracket == "5"){min = 501; max = 99999}
        setPriceMin(min);
        setPriceMax(max);
        setResetPrice(bracket);
        
    }

    const handleDistance = (e: any) => {
        var val = e.target.value;
        console.log(val);
        setDistanceVal(val);
    }

    const filterResults = (e: React.MouseEvent<HTMLButtonElement>) => {
        rating = ratingVal;
        min = priceMin;
        max = priceMax;
        distance = distanceVal;
        
        console.log("Rating : "+rating+", Price Range ["+min+","+max+"], Distance : "+distance);
        let updateList = [...originalListing];
        console.log("Original : "+updateList.length);
        var filtered = updateList.filter((listing) =>(((listing.site_rating + listing.hotel_rating + listing.des_rating)/ 3.0) >= rating));
        console.log("After Rating Filter : "+filtered.length);
        filtered = filtered.filter((listing) =>(((listing.site_price + listing.hotel_price) >= min && (listing.site_price + listing.hotel_price) <= max)));
        console.log("After Price Filter : "+filtered.length);
        filtered = filtered.filter((listing) =>(((listing.des_distance) <= distance)));
        console.log("After Distance  Filter : "+filtered.length);
        setListing(filtered);
        setFilteredListing(filtered);
    };

    const resetResults = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPriceMin(0);
        setPriceMax(99999);
        setRating(0);  
        setResetRating(0);
        setResetPrice(0);
        setDistanceVal(5000);
        setListing([...originalListing]);
    };


    const handleSiteRating = (num: number) => {
        var stars: number = num;
        var res = "";
        for(var i=0;i<stars;i++){
            res+=String.fromCodePoint(0x2B50);
        }
        return res;
    }


    useEffect(() => {
        console.log("Using effect");
        sendGetRequest();
    }, []);
    return (
        <Container>
            <Container style={cardShadowPadding}>
                <h3>Search Filter</h3>
                
                <Row xs={1} md={4} className="g-4">
                    <Col><input placeholder="Site Name" type="text" value={search} onChange={handleSearchChange} /></Col>
                    <Col>
                        Rating : .
                        <select value={resetRating} id="dest" name="dest" onChange={handleStarRating} >
                            <option value="0">All Rating</option>
                            <option value="1">{handleSiteRating(1)}</option>
                            <option value="2">{handleSiteRating(2)}</option>
                            <option value="3">{handleSiteRating(3)}</option>
                            <option value="4">{handleSiteRating(4)}</option>
                            <option value="5">{handleSiteRating(5)}</option>
                        </select>
                    </Col>
                    <Col> Prices : .
                        <select value={resetPrice} id="dest" name="dest" onChange={handlePriceBracket} >
                            <option value="0">All Prices</option>
                            <option value="1">$50 - $100</option>
                            <option value="2">$101 - $200</option>
                            <option value="3">$201 - $350</option>
                            <option value="4">$351 - $500</option>
                            <option value="5">$500+</option>
                        </select>
                    </Col>
                    <Col>Maximum Distance {distanceVal} KMs<Form.Range onChange={handleDistance} min="0" max="5000" value={distanceVal}/></Col>
                </Row>
                <Row>
                <br/>
                
                <p>Showing {listing.length} result</p>
                <Col></Col>
                <Col>
                    <Button variant="success" style={margin} onClick={filterResults}>Filter</Button>
                    <Button variant="warning" style={margin} onClick={resetResults}>Reset</Button>
                    </Col>
                <Col></Col>
                </Row>
                

            </Container>
            <br />
            <Row xs={1} md={4} className="g-4">
                {listing.map((listing) => (
                    <Listing listing={listing} key={0} />
                ))}
            </Row>
        </Container>
    );

}



export default ListingsPage;