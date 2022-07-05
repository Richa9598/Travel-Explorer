import React, { PureComponent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";
import ImageGallery from './ImageGallery';

type Props = {};

type TripDetailsProps = {
    // listing: {
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
    // };
};

const TripDetails = () => {

    var id = useParams().id;
    const navigate = useNavigate();
    const [listingImages, setListingImages] = useState<TripDetailsProps[]>([]);
    const [listingDetails, setListingDetails] = useState<TripDetailsProps[]>([]);
    var trp: TripDetailsProps[];


    const [startMinDate, setStartMinDate] = useState("");
    const [endMinDate, setEndMinDate] = useState("");
    const [todayDate, setTodayDate] = useState("");


    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [days, setDays] = useState(0);
    const [price, setPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [bookingStatus, setbookingStatus] = useState("");



    // console.log(todayDate);


    const getTodayDate = () => {
        var dd = new Date();
        var ddStr = dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        setStartDate(dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate());
        console.log("getTodayDate : " + ddStr);
        return ddStr;
    }

    const handleStartDate = (e: any) => {
        setStartDate(e.currentTarget.value);
        setEndMinDate(e.currentTarget.value);
    }

    const handleEndDate = (e: any) => {
        setEndDate(e.currentTarget.value);
        setFinalPrice(finalPrice);


    }

    const bookTrip = () => {
        sendPostRequestBooking();
    }

    const handlePricing = () => {
        var date1 = new Date(startDate);
        var date2 = new Date(endDate);

        console.log("End Date :   " + startDate);
        console.log("start Date : " + endDate);


        var diffTime = date2.getTime() - date1.getTime();
        var diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

        console.log("Diff Time: " + diffTime);
        console.log("Diff : " + diffDays);

        setDays(diffDays);
        // setFinalPrice(diffDays * price);
    }
    const cardShadowPadding = {
        marginTop: "20px",
        padding: "40px",
        fontFamily: "Arial",
        boxShadow: "5px 5px 10px #888888"
    };

    const cardShadowPaddingImg = {
        marginTop: "20px",
        padding: "40px",
        boxShadow: "5px 5px 10px #888888",
        width: "80%"

    };

    const centerCropped = {
        width: "300px",
        height: "600px",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
    };

    const handleRating = (des: number, site: number, hotel: number) => {
        var stars: number = Number(((des + site + hotel) / 3.0).toFixed(1));
        var res = "";
        for (var i = 0; i < stars; i++) {
            res += String.fromCodePoint(0x2B50);
        }
        return res;
    }

    const handleSiteRating = (site: number) => {
        var stars: number = site;
        var res = "";
        for (var i = 0; i < stars; i++) {
            res += String.fromCodePoint(0x2B50);
        }
        return res;
    }

    const handleTripDetails = () => {
        // let listItem:TripDetailsProps = listing;
        // console.log("LIST : " + listingDetails);
        return "213";//listing[0].des_id;
    }

    const handlePricePerNigh = (site: number, hotel: number) => {
        // setPrice(200);
        return "$" + (site + hotel) + " per night";
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

    const changeImage = (url: string) => {
        // console.log(url);
        return require('../' + url);
    }

    const getTitle = (site: string, hotel: string) => {
        return (site + " with stay at " + hotel).substring(0, 50);
    }


    const sendGetRequestDetails = async () => {
        try {

            axios.defaults.baseURL = 'http://localhost:3000'
            console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/listingDetail/' + id
            );
            // console.log("TRYING Listings");
            setListingDetails(response.data);
            // console.log(response.data);
            // console.log(listingDetails);
            trp = response.data;
            // console.log("TRP : " + trp);

        } catch (err) {
            console.log(err);
        }
    };

    const sendPostRequestBooking = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            console.log(axios.defaults.baseURL);
            const response = await axios.post(
                '/book/',
                {
                    "id": 99,
                    "trip_id": id,
                    "start_date": startDate,
                    "end_date": endDate
                }
            );
            setbookingStatus("Booking Successfull");
        } catch (err) {
            console.log(err);
        }
    };


    const sendGetRequestDetailsImages = async () => {
        try {

            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/listingDetailImages/' + id
            );
            // console.log("TRYING Listings");
            setListingImages(response.data);
            // console.log(response.data);
            // console.log(listingImages);


        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        // console.log("Using effect");
        sendGetRequestDetailsImages();
        sendGetRequestDetails();
        setStartDate(getTodayDate());
        setEndDate(getTodayDate());
        setDays(1);

    }, []);

    return (
        <div className='container'>
            <div className='container'>
                {listingDetails.map((trip) => (
                    <div className='container'>
                        <div className='container'>
                            <h1>{trip.des_name} <img src={handleImage("images/bookmark.png")} alt="my image" width="30px" onClick={changeImage("images/bookmark2.png")} /></h1>
                            <div className="container" style={cardShadowPadding}>
                                <div className="row">
                                    <h3>{trip.hotel_name}</h3>
                                </div>
                                <div className='container'>
                                    <h4>{handleRating(trip.des_rating, trip.site_rating, trip.hotel_rating)}</h4>
                                    <h4>{handlePricePerNigh(trip.site_price, trip.hotel_price)}</h4>
                                </div>
                            </div>
                        </div>

                        <div className='container' style={cardShadowPaddingImg}>
                            <Carousel>
                                {listingImages.map((trpImg) => (
                                    <Carousel.Item>
                                        <img style={centerCropped}
                                            className="d-block w-100 "
                                            src={handleImage(trpImg.img_url)}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className='container'>
                            {listingImages.map((trpImg) => (
                                <div className="container" style={cardShadowPadding}>
                                    <h3>{trpImg.site_name}</h3>
                                    <div className="row">
                                        {trpImg.site_description}
                                    </div>
                                    <br />
                                    <div className="row">
                                        <h3>Site Ticket Price is ${trpImg.site_price}</h3>
                                    </div>
                                    <div className="row">
                                        <h6>{handleSiteRating(trpImg.site_rating)}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='container'>
                            <div className="container" style={cardShadowPadding}>
                                <h4>You will be staying at</h4>
                                <h3>{trip.hotel_name}</h3>
                                <div className="row">

                                </div>
                                <div className="row">
                                    <h3>Hotel Price is ${trip.hotel_price} per night</h3>
                                </div>
                                <div className="row">
                                    <h6>{handleSiteRating(trip.hotel_rating)}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div style={cardShadowPadding} className="row">
                <div className='col'>Start Date .<input type='date' max='2200-13-13' onChange={handleStartDate} value={startDate} /></div>
                <div className='col'>End Date .<input type='date' min={endMinDate} max='2200-13-13' onChange={handleEndDate} value={endDate} /></div>
                <br /><br />
                <Button variant="primary" size="lg" onClick={handlePricing}>
                    Calculate
                </Button>
            </div>
            <div style={cardShadowPadding} className="row">
                <h4>From {startDate} to {endDate} </h4>
                <h3>Days : {days}</h3>
                <h3>Total : ${finalPrice}</h3>


            </div>
            <div style={cardShadowPadding}>

                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={bookTrip}>
                        Book This Trip !
                    </Button>
                    <br /><br />
                    <span style={{ textAlign: "center" }}><h3>{bookingStatus}</h3></span>
                    {/* <Button variant="secondary" size="lg">
                        Shortlist this trip
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default TripDetails;