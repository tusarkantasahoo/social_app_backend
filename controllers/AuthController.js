const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const login = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          
          if (result) {
            let token = jwt.sign({ username: user.email }, "verySecreatvalue", {
              expiresIn: "1hr",
            });
            res.send({
              message: "Login successful",
              token,
              userData: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                dob: user.dob,
              },
            });
            console.log("Insoe login===",token);
          } else {
            res.json({
              message: "password not match",
            });
          }
        });
      } else {
        res.json({
          message: "No user found",
        });
      }
    }
  );
};

const reAuthenticate = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token",token)
    const decode = jwt.verify(token, "verySecreatvalue");
    console.log("decode val", decode);
    if (decode) {
      var userData = {};
      User.findOne({ email: decode.username }).then(
        (user) => {
          userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
          };
          res.send({
            details: "reloggedin",
            message: "Relogin Successful",
            token: token,
            userData: userData,
          });
        }
     
      );

      
    }
  } catch (error) {
    res.send({
      details: "reloginFailed",
      message: "Token Invalid",
    });
  }
};

module.exports = {
  login,
  reAuthenticate,
};
