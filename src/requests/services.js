import axios from "axios";

class Service {
  constructor() {
    let service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }
  
  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    console.log("Service error: ", error);
    var currentLocation = window.location.pathname;

    if (error.response && error.response.status === 401) {
      if (currentLocation.includes("admin")) {
        localStorage.removeItem("admin_access_token");
      }else{
        localStorage.removeItem("access_token");
      }
    } else if (error.response && error.response.status === 400) {
      const statusCode = error.response.data.responseCode;
      if (statusCode === 4002 || statusCode === 4003) {
      }
    }
    return Promise.reject(error);
  };

  extGet(path, params, callback) {
    return this.service
      .get(path, {
        params,
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }
  extPost(path, payload, callback) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  get(path, params, callback) {
    var currentLocation = window.location.pathname;
    let token = localStorage.getItem("access_token");
    if (currentLocation.includes("admin")) {
      token = localStorage.getItem("admin_access_token");
    }
    return this.service
      .get(path, {
        params,
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  getCM(path, params, callback) {
    var currentLocation = window.location.pathname;
    let token = localStorage.getItem("access_token");
    if (currentLocation.includes("admin")) {
      token = localStorage.getItem("admin_access_token");
    }
    return this.service
      .get(path, {
        params,
        headers: {
          Authorization: token,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  getBlob(path, params, callback) {
    var currentLocation = window.location.pathname;
    let token = localStorage.getItem("access_token");
    if (currentLocation.includes("admin")) {
      token = localStorage.getItem("admin_access_token");
    }
    return this.service
      .get(path, {
        params,
        responseType: "blob",
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  patch(path, payload, callback) {
    var currentLocation = window.location.pathname;
    let token = localStorage.getItem("access_token");
    if (currentLocation.includes("admin")) {
      token = localStorage.getItem("admin_access_token");
    }
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  put(put, payload, callback) {
    var currentLocation = window.location.pathname;
    let token = localStorage.getItem("access_token");
    if (currentLocation.includes("admin")) {
      token = localStorage.getItem("admin_access_token");
    }
    return this.service
      .request({
        method: "PUT",
        url: put,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }
  postCM(path, payload, callback) {
    var currentLocation = window.location.pathname;
    let token = localStorage.getItem("access_token");
    if (currentLocation.includes("admin")) {
      token = localStorage.getItem("admin_access_token");
    }
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: token,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }
  post(path, payload, callback) {
    var currentLocation = window.location.pathname;
    let token = localStorage.getItem("access_token");
    if (currentLocation.includes("admin")) {
      token = localStorage.getItem("admin_access_token");
    }
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  getLogout(path, payload, callback) {
    return this.service
      .request({
        method: "GET",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  delete(path, payload, callback) {
    var currentLocation = window.location.pathname;
    let token = localStorage.getItem("access_token");
    if (currentLocation.includes("admin")) {
      token = localStorage.getItem("admin_access_token");
    }
    return this.service
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }
}

export default new Service();
