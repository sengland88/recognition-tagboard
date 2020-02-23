const passport = require("passport");
const express = require("express");
const router = express.Router();
const db = require("./models");
var isAuthenticated = require("./config/middleware/isAuthenticated");

//Post Routes++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.post("/api/register", function(req, res) {
  console.log("registering user");

  db.User.register(
    new db.User({ 
      firstname: req.body.firstname, 
      lastname: req.body.lastname, 
      position: req.body.position, 
      department_id: req.body.department_id, 
      username: req.body.username, 
      email: req.body.email }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      passport.authenticate("local")(req, res, function(data) {
        res.json(req.user);
      });
    }
  );
});

router.post("/api/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.post("/api/imageupload", isAuthenticated, function(req, res) {
  console.log("image connected")
  console.log(req)

// work on this route
});


router.post("/api/comment", isAuthenticated, function(req, res) {
  console.log("comment connected")
  console.log(req.user)
  console.log(req.body)

  let data = {
    submitter_id: req.user._id,
    department_id: req.body.department_id,
    comment: req.body.comment
  }

  db.Comment.create(data)
    .then(function(data) {
      console.log(data)
    })
    .catch(function(err) {
      console.log(err)
    })
});

router.post("/api/admin", isAuthenticated, function(req, res) {
  console.log("admin connected")
  console.log(req.body)

  let result = {
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    admin: req.body.admin
  }

  db.Employee.create(result)
    .then(function(data) {
      console.log(data)
    })
    .catch(function(err) {
      console.log(err)
    })
});


// Get Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/api/departments", function(req, res) {
  db.Department.find({})
  .then(result => {
    console.log(result)
    res.json(result)
  })
  .catch(err => {
    res.json(err)
  })
});

router.get("/api/userinfo", isAuthenticated, function(req, res) {
  console.log("welcome connected")
  console.log(req)
  db.User.find({ _id: req.user._id})
  .populate("department_id")
  .then(result => {
    console.log(result)
    res.json(result)
  })
  .catch(err => {
    res.json(err)
  })
});

router.get("/api/user", function(req, res) {
  console.log("available username");
  if (req.query.username) {
    db.User.find({ username: req.query.username })
    .then(result => {
      res.json({ length: result.length });
    })
    .catch(err => res.status(422).json(err));
  } else {
    res.json({ message: "no username entered for query" });
  }
});

router.get("/api/authorized", isAuthenticated, function(req, res) {
  console.log(req.user)
  res.json(req.user);
});

router.get("/api/logout", function(req, res) {
  req.logout();
  res.json({ message: "logged out" });
});


// Put Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.put("/api/update", isAuthenticated, function(req, res) {
  console.log("update connected")
  console.log(req.body)

  // this works ... just creates a new entry. ask for help

  // db.User.update(req.body)
  //   .then(function(data) {
  //     return db.User.findOneAndUpdate(
  //       { _id: req.user.id },
  //       { employee: data._id },
  //       { new: true }
  //     );
  //   })
  //   .then(function(data){
  //     res.json(data)
  //   })
  //   .catch(function(err) {
  //     console.log(err)
  //   })
});

module.exports = router;