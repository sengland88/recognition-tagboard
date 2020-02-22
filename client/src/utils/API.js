import axios from "axios";

export default {
  register: function (user) {
    return axios.post("/api/register", user);
  },
  login: function (user) {
    return axios.post("/api/login", user);
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
  admin: function (data) {
    console.log("admin connecting")
    return axios.post("/api/admin", data);
  },
  welcome: function (data) {
    console.log("welcome connecting")
    return axios.get("/api/welcome");
  },
  update: function (data) {
    console.log("update connecting")
    return axios.post("/api/update", data);
  }
};