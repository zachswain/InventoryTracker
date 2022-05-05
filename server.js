const express = require('express')
const app = express()
const port = 8080
const db = require("./db");
const config = require("config");

app.use(express.static("dist"));

const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

if( db.initialized() ) {
    console.log("Database intialized");
} else {
    console.log("Database NOT initialized");
    db.init();
}

db.sync().then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
});