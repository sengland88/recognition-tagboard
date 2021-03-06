require("dotenv").config();

const passport = require("passport");
const express = require("express");
const router = express.Router();
const db = require("./models");
var isAuthenticated = require("./config/middleware/isAuthenticated");
const nodemailer = require("nodemailer");
const keys = require("./keys");

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
      email: req.body.email
    }),
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
  console.log("image connected");
  console.log(req);

  // work on this route
});

router.post("/api/commentdepartment", isAuthenticated, function(req, res) {
  let data = {
    submitter_id: req.user._id,
    department_id: req.body.department_id,
    comment: req.body.comment
  };

  db.Comment.create(data)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.post("/api/commentemployee", isAuthenticated, function(req, res) {
  let data = {
    submitter_id: req.user._id,
    receiver_id: req.body.employee_id,
    comment: req.body.comment
  };

  db.Comment.create(data)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.post("/api/admin", isAuthenticated, function(req, res) {
  let result = {
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    admin: req.body.admin
  };

  db.Employee.create(result)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.post("/api/adddepartment", isAuthenticated, function(req, res) {
  let result = {
    name: req.body.name
  };

  db.Department.create(result)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// router.post("/api/email", isAuthenticated, function(req, res) {

//   const message = `
//   Comment: ${req.body.comment}`

//   var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: keys.gmail.id,
//         pass: keys.gmail.secret
//       }
//     });

//     var mailOptions = {
//       from: 'shelbyenglandcoding@gmail.com',
//       to: req.user.email,
//       subject: `Thank for Leaving a Comment!`,
//       text: message
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//         res.json(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

//   res.json("it worked.");
// });

// Get Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/api/departments", function(req, res) {
  db.Department.find({})
    .sort({ name: 1 })
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/loademployees", isAuthenticated, function(req, res) {
  db.User.find({})
    .sort({ firstname: 1 })
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/userinfo", isAuthenticated, function(req, res) {
  console.log("welcome connected");
  console.log(req);
  db.User.find({ _id: req.user._id })
    .populate("department_id")
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/employeeinfo/:id", isAuthenticated, function(req, res) {
  db.User.findOne({ _id: req.params.id })
    .populate("department_id")
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/departmentcomments/:id", isAuthenticated, function(req, res) {
  db.Comment.find({ department_id: req.params.id })
    .populate("submitter_id")
    .populate("department_id")
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/employeecomments/:id", isAuthenticated, function(req, res) {
  db.Comment.find({ receiver_id: req.params.id })
    .populate("submitter_id")
    .populate("receiver_id")
    .then(result => {
      console.log("*-*-*-*-");
      console.log(result);
      console.log("*-*-*-*-");
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
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

router.get("/api/loadcomments", isAuthenticated, function(req, res) {
  db.Comment.find({})
    .populate("submitter_id")
    .populate("department_id")
    .populate("receiver_id")
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/authorized", isAuthenticated, function(req, res) {
  console.log(req.user);
  res.json(req.user);
});

router.get("/api/logout", function(req, res) {
  req.logout();
  res.json({ message: "logged out" });
});

// Put Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.put("/api/updatemyinfo", isAuthenticated, function(req, res) {
  db.User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true })
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.put("/api/userupdate", isAuthenticated, function(req, res) {
  db.User.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.put("/api/updatecomment", isAuthenticated, function(req, res) {
  db.Comment.findByIdAndUpdate({ _id: req.body.comment_id }, req.body, {
    new: true
  })
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.put("/api/updatedepartment", isAuthenticated, function(req, res) {
  db.Department.findByIdAndUpdate({ _id: req.body.department_id }, req.body, {
    new: true
  })
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// Delete Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.delete("/api/deletecomment/:id", isAuthenticated, function(req, res) {
  db.Comment.remove(
    {
      _id: req.params.id
    },
    function(error, removed) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(removed);
        res.send(removed);
      }
    }
  );
});

router.delete("/api/deleteuser/:id", isAuthenticated, function(req, res) {
  db.User.deleteOne(
    {
      _id: req.params.id
    },
    function(error, removed) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(removed);
        res.send(removed);
      }
    }
  );

  db.Comment.remove(
    {
      submitter_id: req.params.id
    },
    function(error, removed) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(removed);
        res.send(removed);
      }
    }
  );
});

module.exports = router;
