import axios from "axios";

export default {
  //Post Request
  register: function (user) {
    return axios.post("/api/register", user);
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },
  admin: function (data) {
    console.log("admin connecting")
    return axios.post("/api/admin", data);
  },
  imageUpload: function (data) {
    console.log("image connecting")
    return axios.post("/api/imageupload", data);
  },
  submitComment: function (data) {
    console.log("comment connecting")
    return axios.post("/api/comment", data);
  },

  // Get Requests
  getDepartments: function () {
    return axios.get("/api/departments");
  },
  isAuthorized: function () {
    return axios.get("/api/authorized");
  },
  logout: function () {
    return axios.get("/api/logout");
  },
  availableUN: function (username) {
    return axios.get("/api/user/?username=" + username);
  },
  getUserInfo: function (data) {
    console.log("welcome connecting")
    return axios.get("/api/userinfo");
  },
  getComments: function (data) {
    console.log("load comments connecting")
    return axios.get("/api/loadcomments");
  },
  getEmployees: function () {
    console.log("getting employees")
    return axios.get("/api/loademployees");
  },
  getEmployeeInfo: function (id) {
    console.log("getting employee info")
    return axios.get("/api/employeeinfo");
  },

  // Put Routes
  updateUserInfo: function (data) {
    console.log("update connecting")
    return axios.put("/api/update", data);
  },

  //Destroy Routes
  deleteComment: function (data) {
    console.log("delete connecting")
    return axios.delete("/api/deletecomment", data);
  },
  

};