const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./authentication/passport");
loginCheck(passport);

const database = process.env.MONGOLAB_URI;
console.log(database);
mongoose
  .connect("mongodb+srv://web3:web3onwards2023@nfthing.irkavfn.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("it has connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
/*app.use(session({
    secret:'2023@NFThing#web3onwards!!',
    saveUninitialized: true,
    resave: true
  }));*/
  

app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes/login"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server has started at port " + PORT));