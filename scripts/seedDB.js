const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/ValenciaCollege"
);

const departmentSeed = [
  {
    department: "Organizational Communication",
    created: Date.now()
  },
  {
    department: "Talent Acquisition",
    created: Date.now()
  },
  {
    department: "Conferencing and College Events",
    created: Date.now()
  }, 
];

db.Department
  .remove({})
  .then(() => db.Department.collection.insertMany(departmentSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
