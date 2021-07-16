var nodemailer = require("nodemailer");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mailSend = require("./SecreatsFormail");
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
            console.log("Insoe login===", token);
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
    console.log("token", token);
    const decode = jwt.verify(token, "verySecreatvalue");
    console.log("decode val", decode);
    if (decode) {
      var userData = {};
      User.findOne({ email: decode.username }).then((user) => {
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
      });
    }
  } catch (error) {
    res.send({
      details: "reloginFailed",
      message: "Token Invalid",
    });
  }
};

const linkForForgotpassword = (req, res) => {
  try {
    const email = req.body.email;

    User.findOne({ email: email }).then((user) => {
      console.log("user", user);
      let token = jwt.sign({ username: email }, "forgotPasswordSecreatvalue", {
        expiresIn: 60 * 5 * 60,
      });
      mailSend.mailSendHandel(email, token, res);
    });
  } catch (error) {
    res.send({
      details: "userinvalid",
      message: "username invalid",
    });
  }
};

const updatePassword = (req, res) => {
  var token = req.body.token;

  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.send({
        error: err,
      });
    }

    const decode = jwt.verify(token, "forgotPasswordSecreatvalue");
    if (decode) {
      console.log("token ok");
      var user1 = decode.username;
      console.log("username", decode);
      User.findOne({ email: user1 })
        .then((user) => {
          console.log("got user", user);
          user.password = hashedPass;
            user.save()
            .then(response => {
              res.send({
                  message: "Password updated Successfully",
                  code:"passwordUpdated"
              })
              })
              .catch(err =>{
                res.send({
                  message:"an error occured"
                })
              })
        })
        .catch((error) => {
          res.send({
            message: "An error Occured",
          });
        });
    }
  });
};

module.exports = {
  login,
  reAuthenticate,
  linkForForgotpassword,
  updatePassword,
};
