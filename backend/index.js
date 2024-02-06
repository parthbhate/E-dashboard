const express = require("express");

const cors = require("cors");

//const config = require('./db/config');
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

// JWT tokens to imporve Security ;
const Jwt = require("jsonwebtoken");
const jwtKey = "e-com";

const app = express();
// using middleware
app.use(express.json());                                               //  this is middle ware we are using
app.use(cors());
// making router ;
// api
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();

  result = result.toObject();
  delete result.password;
  //  res.send(result);
  Jwt.sign({ result }, jwtKey, { expiresIn: "5h" }, (err, token) => {
    if (err) {
      res.send({
        result: " something went wrong please try after some time !!!",
      });
    }
    res.send({ result, auth: token });
  });
});

// app.post("/login",async(req,res)=>{
//    let user= await User.findOne(req.body)
//       res.send(user)

// app.post("/login",async(req,res)=>{

//     let user = await User.findOne(req.body).select("-password")
//     res.send(user)
// })

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "5h" }, (err, token) => {
        if (err) {
          res.send({
            result: " something went wrong please try after some time !!!",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No user Found !!!" });
    }
  } else {
    res.send({ result: "No user Found !!!" });
  }
});
 

app.post("/add-product",verifyToken, async (req, res) => {          // we have added varifyication token
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products",verifyToken, async (req, res) => {               // we have added varifyication token
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products found " });
  }
});

app.delete("/product/:id", verifyToken,async (req, res) => {           // we have added varifyication token
  //const result = await Product.deleteOne({_id:req.params.id})
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id",verifyToken, async (req, res) => {              // we have added varifyication token
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found !!" });
  }
});

// update product API  use set dollar here
app.put("/product/:id",verifyToken, async (req, res) => {             // we have added varifyication token
  let result = await Product.updateOne( 
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// Making API for searching product
app.get("/search/:key", verifyToken, async (req, res) => {            // we have added varifyication token
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// making middleware here to verifyToken

function verifyToken(req, res, next) {                                          // we have added varifyication token
  let token = req.headers["authorization"]; 
  if (token) {
    token = token.split(" ")[1];                                               // [1] we are using to check key  here
    console.warn("middleware called if", token);
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({result:" please provide valid token  !!!!"})
      }else{
        next();
      }
    });
  } else {
    res.status(403).send({result:" please add token within header !!!!"})
  }

  
 
}

app.listen(3000);
//console.log("Server Location= http://localhost:3000")
