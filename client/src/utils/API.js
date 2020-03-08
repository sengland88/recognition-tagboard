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
    return axios.post("/api/admin", data);
  },
  imageUpload: function(data) {
    return axios.post("/api/imageupload", data);
  },
  submitCommentDepartment: function(data) {
    return axios.post("/api/commentdepartment", data);
  },
  submitCommentEmployee: function(data) {
    return axios.post("/api/commentemployee", data);
  },
  addDepartment: function(data) {
    return axios.post("/api/adddepartment", data);
  },
  // sendEmail: function(data) {
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
    return axios.get("/api/userinfo");
  },
  getComments: function(data) {
    return axios.get("/api/loadcomments");
  },
  getEmployees: function() {
    return axios.get("/api/loademployees");
  },
  getEmployeeInfo: function(id) {
    return axios.get("/api/employeeinfo/" + id);
  },
  getDepartmentComments: function(id) {
    return axios.get("/api/departmentcomments/" + id);
  },
  getEmployeeComments: function(id) {
    return axios.get("/api/employeecomments/" + id);
  },

  // Put Routes +++++++++++++++++++++++++++++++++++
  updateMyInfo: function(data) {
    return axios.put("/api/updatemyinfo", data);
  },
  updateUserInfo: function(data) {
    return axios.put("/api/userupdate", data);
  },
  updateComment: function(data) {
    return axios.put("/api/updatecomment", data);
  },
  updateDepartment: function(data) {
    return axios.put("/api/updatedepartment", data);
  },

  //Destroy Routes +++++++++++++++++++++++++++++++++
  deleteComment: function(id) {
    return axios.delete("/api/deletecomment/" + id);
  },
  deleteUser: function(id) {
    return axios.delete("/api/deleteuser/" + id);
  }
};
