const express = require('express');
const router = express.Router();

const User = require('../models/user-model');

const passport = require('passport');

const bcrypt = require('bcryptjs');
const bcryptSalt = 10;


router.post("/signup", (req, res, next) => {
  const { username, email, encryptedPassword } = req.body;

  if(username == '' || email == '' || encryptedPassword.match(/[0-9]/) === null){
    // send error JSON if any of the fields is empty or password doesn't contain a number
    res.status(401).json({ message: "All fields need to be filled and password must contain a number." })
    return;
  }

//   if(password.length < 7){
//     res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
//     return;
// }

  User.findOne({ email })
  .then(foundUser => {
    if(foundUser !==null){
      res.status(401).json({ message: "A user with the same email is already registered!" })
      return;
    }

      console.log("33 line")
      // encrypt the submitted password before saving
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashpass = bcrypt.hashSync(encryptedPassword, salt);
      
      User.create({ username, email, encryptedPassword: hashpass })
      .then(userDoc => {
          console.log("40 line")
          // if all good, log in the user automatically
          // "req.logIn()" is a Passport method that calls "serializeUser()"
          // (that saves the USER ID in the session)
          req.login(userDoc, () => {
            console.log("45 line")
            // hide "encryptedPassword" before sending the JSON (it's a security risk)
            userDoc.encryptedPassword = undefined;
            res.json({ userDoc });
          });
        })
        .catch( err => {
          console.log("52 line")
          next(err)
      }); //closing User.create()
  })
  .catch( err => next(err)); // closing User.findOne();
})

//////////////// LOGIN /////////////////////
router.post("/login", (req, res, next) => {
  // LOGIN WITHOUT PASSPORT-LOCAL-STRATEGY:

  // const { email, originalPassword } = req.body;
  // // search the database for a user with that email
  // User.findOne({ email })
  // .then(userDoc => {
  //   // "userDoc" will be empty if the email is wrong
  //   if (!userDoc) {
  //     next(new Error("Incorrect email. 🤦‍♂️"));
  //     return; // use "return" instead of a big else
  //   }

  //   // check the password
  //   const { encryptedPassword } = userDoc;
  //   // "compareSync()" will return FALSE if "originalPassword" is WRONG
  //   if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
  //     next(new Error("Incorrect password. 🤯"));
  //   }
  //   else {
  //     // "req.logIn()" is a Passport method that calls "serializeUser()"
  //     // (that saves the USER ID in the session)
  //     req.logIn(userDoc, () => {
  //       // hide "encryptedPassword" before sending the JSON (it's a security risk)
  //       userDoc.encryptedPassword = undefined;
  //       res.json({ userDoc });
  //     });
  //   }
  // })
  // .catch(err => next(err));
  // LOGIN WITH PASSPORT-LOCAL-STRATEGY:
  passport.authenticate('local', (err, userDoc, failureDetails) => {
    console.log('ok', err, userDoc)

    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return;
    }

    if (!userDoc) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(userDoc, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong while login!' });
        return;
      }

      // We are now logged in (notice req.user) => we can send req.user since we have it available
      // or userDoc, which is the placeholder how we named the user document we found in DB based on inputted email and password
      // res.json(req.user);
      res.json({ userDoc });
    });
  })(req, res, next);
})

//////////////// LOGOUT /////////////////////

router.delete("/logout", (req, res, next) => {
  // "req.logOut()" is a Passport method that removes the user ID from session
  req.logOut();

  // send empty "userDoc" when you log out
  res.json({ userDoc: null });
});

// GET "/checkuser" allows the client to check to see:
// (a) if we are logged-in
// (b) what are the details of the logged-in user
router.get("/checkuser", (req, res, next) => {
  if (req.user) {
  // hide "encryptedPassword" before sending the JSON (it's a security risk)
    req.user.encryptedPassword = undefined;
    res.json({ userDoc: req.user });
  }
  else {
    res.json({ userDoc: null });
  }
});

router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;
