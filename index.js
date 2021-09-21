const PORT = 8080;

const express = require("express");
const helmet = require("helmet");
const volleyball = require("volleyball");

const connection = require("./db/connection");



const app = express();

app.use(helmet());
app.use(volleyball);

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    };
  	next();
});

app.get("/:code", async (req, res) => {    

    try {
        /* connection.connect(); */

        connection.query('SELECT * FROM codes WHERE code = ?', [
                req.params.code
            ], function (err, rows, fields) {
                if (err) throw err;
                
                
                if(rows.length != 1) {
                    res.send("Nothing found");
                    return;
                }

                const target = rows[0].target;
                if(!target) {
                    res.status(500);
                    res.send("There was an Error");
                    return;
                }

                res.redirect(target);
                return;
            })
        
        /* connection.end() */

    } catch (err) {
        console.log(err);
        return;
    }

})


app.listen(PORT, () => {
    console.log("QR server listening on port " + PORT);
});