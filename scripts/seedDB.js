const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/ValenciaCollege"
);

const departmentSeed = [
  {
    name: "Organizational Design and Development",
    created: Date.now()
  },
  {
    name: "Conferencing and College Events",
    created: Date.now()
  },
  {
    name: "Employee Development",
    created: Date.now()
  },
  {
    name: "HR Policy and Compliance",
    created: Date.now()
  },
  {
    name: "Organizational Communication",
    created: Date.now()
  },
  {
    name: "Total Rewards",
    created: Date.now()
  },
  {
    name: "Talent Acquisition",
    created: Date.now()
  },
  {
    name: "Payroll Services",
    created: Date.now()
  },
  {
    name: "Employee Records",
    created: Date.now()
  },
  {
    name: "Compensation",
    created: Date.now()
  },
  {
    name: "HRIS and Analytics",
    created: Date.now()
  },
  {
    name: "Regional Solution Center, West Region",
    created: Date.now()
  },
  {
    name: "Regional Solution Center, East Region",
    created: Date.now()
  },
  {
    name: "Regional Solution Center, Osceola Region",
    created: Date.now()
  },
  {
    name: "Employment Services",
    created: Date.now()
  },
  {
    name: "ODHR Administration",
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
