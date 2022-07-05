var jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: true, }));
var mysql = require('mysql');
var databaseModule = require("./models/destination");
var credModule = require("./cred");
var cors = require('cors')
app.use(cors())

const key = 'MuchSecretVerySecureSoSafe';
const sign = require('jwt-encode');
const serverStatus = {
    "status": 500,
    "msg": "Internal Server Error"
};

var serverResponse = {
    "data": null,
    "serverStatus": null
}

console.log(credModule.connDetails);



app.get("/destinations", (req, res) => {


    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO DESTINATION API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query(databaseModule.allDestinations, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get("/transports", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO TRANSPORTS API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query("SELECT * FROM TRANSPORTS", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});



app.get("/destinations/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO DESTINATION API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `SELECT * FROM DESTINATIONS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});


app.get("/listings/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO LISTINSG API " + req.params.id);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql;
        if (req.params.id == 0) {
            console.log("Listing All Destinations")
            sql = databaseModule.listingsAllDestinations;
        } else {
            console.log("Listing All Destinations by ID : " + req.params.id);
            sql = databaseModule.listingsByDestinationsId + req.params.id;
        }

        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/listingDetail/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO LISTINSG Details API " + req.params.id);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = databaseModule.listingsByListingId + req.params.id + " limit 1";
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/listingDetailImages/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO LISTINSG Details API " + req.params.id);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = databaseModule.listingsByListingImagesId + req.params.id;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});
app.get("/transports/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO TRANSPORTS API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `SELECT * FROM TRANSPORTS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/hotels", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO HOTELS API");
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        conn.query("SELECT * FROM hotels", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get("/hotels/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO HOTELS API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `SELECT * FROM HOTELS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/sites", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        conn.query("SELECT * FROM sites", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/sites/:des_id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log(req.params.des_id);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        conn.query(`SELECT * FROM sites where des_id = ${req.params.des_id}`, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});


//for login page
app.post("/login", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log('Got INTO LOGIN API')
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);

        var sql = "select login_username,login_password from login where login_username='"+req.body.uname +"' AND login_password='" +req.body.password +"'";
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(req.body.uname);
            console.log(req.body.password);
            console.log(result);

            const token = sign(result, key);
            console.log(token);
            res.json({ token: token });
        });
    });

});


app.post("/destinations", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO DESTINATION API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = `INSERT INTO DESTINATIONS (des_name, des_distance, des_rating) VALUES ('${req.body.des_name}',${req.body.des_distance}, ${req.body.des_rating} )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


app.post("/book", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO DESTINATION API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = `INSERT INTO user_bookings (id, trip_id, start_date, end_date) VALUES ('${req.body.user_id}',${req.body.trip_id}, '${req.body.start_date}', '${req.body.end_date}' )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get("/book", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO Bookinh API");
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = `select * from user_bookings`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//Registration
app.post("/register", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO REGISTER API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO LOGIN (
            login_username,
            login_password,
            usertype,
            email,
            address) VALUES ('${req.body.username}','${req.body.userpass}', 'user','${req.body.email}','${req.body.address}' )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log(result);
        });
    });
});
//for forgot password
app.put("/register/:u_name", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO login API");
    console.log(req.params.u_name);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = "UPDATE login set login_password='" + req.body.u_pass + "' where login_username = '" + req.params.u_name + "'";
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


app.post("/transports", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO DESTINATION API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO TRANSPORTS (
            t_name,
            t_price,
            t_rating,
            t_description,
            t_capacity) VALUES ('${req.body.t_name}',${req.body.t_price}, ${req.body.t_rating},'${req.body.t_description}',${req.body.t_capacity} )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
app.post("/transports", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO DESTINATION API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO TRANSPORTS (
            t_name,
            t_price,
            t_rating,
            t_description,
            t_capacity) VALUES ('${req.body.t_name}',${req.body.t_price}, ${req.body.t_rating},'${req.body.t_description}',${req.body.t_capacity} )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.post("/hotels", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO HOTELS API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO HOTELS (
            id,
            hotel_name,
            hotel_price,
            hotel_rating,
            des_id) VALUES ('${req.body.hotel_name}', ${req.body.hotel_price},${req.body.hotel_rating},${req.body.des_id})`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


app.put("/destinations/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO DESTINATION API");
    console.log(req.body.des_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE DESTINATIONS set des_name = '${req.body.des_name}', des_distance = ${req.body.des_distance}, des_rating = ${req.body.des_rating} where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.put("/transports/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO transports API");
    console.log(req.body.des_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE transports set t_name = '${req.body.t_name}', t_price = ${req.body.t_price}, t_rating = ${req.body.t_rating}, t_description = '${req.body.t_description}', t_capacity=${req.body.t_capacity}  where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


app.put("/hotels/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO HOTELS API");
    console.log(req.body.t_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE hotels set hotel_name = '${req.body.hotel_name}', hotel_price = ${req.body.hotel_price}, hotel_rating = ${req.body.hotel_rating}, des_id = ${req.body.des_id}  where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.put("/sites/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO SITES API");
    console.log(req.body.site_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE sites set site_name = '${req.body.site_name}', site_description = '${req.body.site_description}', site_rating = ${req.body.site_rating}, site_price = ${req.body.site_price}, image_url=${req.body.image_url}  where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.delete("/destinations/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO DESTINATION API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  DESTINATIONS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.delete("/transports/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO transports API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  transports where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


app.delete("/sites/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO sites API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  sites where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.delete("/hotels/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO hotels API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  hotels where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get("/userfeedback", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO FEEDBACK API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query("SELECT * FROM user_feedback", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//contact form apis-Richa
app.get("/contact", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        conn.query("SELECT * FROM contacts_form", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/contact/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO CONTACT FORM API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `SELECT * FROM contacts_form where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
app.post("/contact", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO CONTACT FORM API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `INSERT INTO contacts_form (contact_name, contact_country, contact_email, contact_feadback) VALUES ('${req.body.contact_name}','${req.body.contact_country}',' ${req.body.contact_email}',' ${req.body.contact_feadback}' )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
app.put("/contact/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO CONTACT FORM API");
    console.log(req.body.des_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `UPDATE contacts_form set contact_name = '${req.body.contact_name}', contact_country = ${req.body.contact_country}, contact_email = ${req.body.contact_email}, contact_feadback = ${req.body.contact_feadback} where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.delete("/contact/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO CONTACT FORM API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `DELETE FROM  contacts_form where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//Testimonials apis-Richa


app.get("/testimonial", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        conn.query("SELECT * FROM testimonials", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/testimonial/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID TESTIMONIAL API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `SELECT * FROM testimonials where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
app.post("/testimonial", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO TESTIMONISL FORM API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `INSERT INTO testimonials (picture, name, designation, comment,created_at) VALUES ('${req.body.picture}','${req.body.name}',' ${req.body.designation}',' ${req.body.comment}',' ${req.body.created_at}' )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
app.put("/testimonial/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO TESTIMONIAL");
    console.log(req.body.des_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `UPDATE testimonials set picture = '${req.body.picture}', name = ${req.body.name}, designation = ${req.body.designation}, comment = ${req.body.comment}, created_at = ${req.body.created_at} where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.delete("/testimonial/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO TESTIMONIALS");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `DELETE FROM  testimonials where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//userfeedbacks
app.get("/userfeedback", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO FEEDBACK API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query("SELECT * FROM user_feedback", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
app.get("/userfeedback/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
     console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        var sql = `SELECT * FROM user_feedback where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});









