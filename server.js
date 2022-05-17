const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const app = express()
const httpPort = 8080;
const httpsPort = 8443;
const db = require("./db");
const config = require("config");

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./config/keys.json";

app.use(express.static("dist"));

const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

const options = {
  key: fs.readFileSync(config.get("Server").privateKey),
  cert: fs.readFileSync(config.get("Server").certificate),
};

if( db.initialized() ) {
    console.log("Database intialized");
} else {
    console.log("Database NOT initialized");
    db.init();
}

db.sync().then(() => {
    https.createServer(app, options).listen(httpsPort, () => {
        console.log(`Inventory Tracker listening on port ${httpsPort}`)
    });
    http.createServer(app).listen(httpPort, () => {
        console.log(`Inventory Tracker listening on port ${httpPort}`)
    });
});