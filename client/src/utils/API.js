import axios from "axios";

export default {
  //Post Request ++++++++++++++++++++++++++++
  register: function(user) {
    return axios.post("/api/register", user);
  },
  login: function(user) {
    return axios.post("/api/login", user);
  },
  admin: function(data) {
    console.log("admin connecting");
    return axios.post("/api/admin", data);
  },
  imageUpload: function(data) {
    console.log("image connecting");
    return axios.post("/api/imageupload", data);
  },
  submitCommentDepartment: function(data) {
    console.log("comment connecting");
    return axios.post("/api/commentdepartment", data);
  },

  submitCommentEmployee: function(data) {
    console.log("comment connecting");
    return axios.post("/api/commentemployee", data);
  },
  // sendEmail: function(data) {
  //   console.log("email connecting");
  //   return axios.post("/api/email", data);
  // },

  // Get Requests ++++++++++++++++++++++++++++++++++++
  getDepartments: function() {
    return axios.get("/api/departments");
  },
  isAuthorized: function() {
    return axios.get("/api/authorized");
  },
  logout: function() {
    return axios.get("/api/logout");
  },
  availableUN: function(username) {
    return axios.get("/api/user/?username=" + username);
  },
  getUserInfo: function(data) {
    console.log("welcome connecting");
    return axios.get("/api/userinfo");
  },
  getComments: function(data) {
    console.log("load comments connecting");
    return axios.get("/api/loadcomments");
  },
  getEmployees: function() {
    console.log("getting employees");
    return axios.get("/api/loademployees");
  },
  getEmployeeInfo: function(id) {
    console.log("getting employee info");
    console.log(id);
    return axios.get("/api/employeeinfo/" + id);
  },
  getDepartmentComments: function(id) {
    console.log("getting department comments");
    console.log(id);
    return axios.get("/api/departmentcomments/" + id);
  },
  getEmployeeComments: function(id) {
    console.log("getting department comments");
    console.log(id);
    return axios.get("/api/employeecomments/" + id);
  },

  // Put Routes +++++++++++++++++++++++++++++++++++
  updateMyInfo: function(data) {
    console.log("update connecting");
    return axios.put("/api/update", data);
  },

  updateUserInfo: function(data) {
    console.log("update connecting");
    return axios.put("/api/userupdate", data);
  },

  updateComment: function(data) {
    console.log("update connecting");
    return axios.put("/api/updatecomment", data);
  },

  //Destroy Routes +++++++++++++++++++++++++++++++++
  deleteComment: function(id) {
    console.log("delete connecting");
    return axios.delete("/api/deletecomment/" + id);
  },

  deleteUser: function(id) {
    console.log("delete connecting");
    return axios.delete("/api/deleteuser/" + id);
  }
};
