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
                userImage:user.userImage
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
        let newToken = jwt.sign({ username: user.email }, "verySecreatvalue", {
          expiresIn: 60 * 5 * 60,
        });

        userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          userImage:user.userImage
        };
        res.send({
          details: "reloggedin",
          message: "Relogin Successful",
          token: newToken,
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

const userLoginFromSocialSite = (req, res) => {
  var userData = req.body;

  console.log(userData);
      User.findOne({ email: userData.email })
        .then((user) => {
          if(user!==null&&user!==undefined){

            console.log("got user", user);
            let token = jwt.sign({ username: userData.email }, "verySecreatvalue", {
              expiresIn: "1hr",
            });
            res.send({
              message: "Login successful",
              token,
              userData: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                userImage:user.userImage
              },
            });

          }
          else{
            console.log("user not found creating user");
            let newUser = new User({
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              userAddedFrom:userData.dataFrom ,
              userImage:userData.image

          })

          newUser.save()
          .then(response => {
            console.log("new user added from social site");
            let token = jwt.sign({ username: userData.email }, "verySecreatvalue", {
              expiresIn: "1hr",
            });
            res.send({
              message: "Login successful",
              token,
              userData: {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
              },
            });
        })
        .catch(error => {
            res.send({
                message: 'An error Occured'
            })
        })
          }
        })

        .catch(e=>{console.log(e)})
      }

  





module.exports = {
  login,
  reAuthenticate,
  linkForForgotpassword,
  updatePassword,
  userLoginFromSocialSite
};
