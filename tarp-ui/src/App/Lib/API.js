import axios from "axios";
import { getHeaders, clearLocal } from "./Utils";

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  return response;
}, handleErrors);

class Api {
  static headers(contentType = "application/json") {
    return getHeaders(contentType);
  }

  static get(route, params) {
    console.log("route", route);

    return this.xhr(route, params, "GET");
  }

  static put(route, params) {
    return this.xhr(route, params, "PUT");
  }

  static post(route, params) {
    return this.xhr(route, params, "POST");
  }

  static postWithFiles(route, params) {
    return this.xhr(route, params, "POST", "multipart/form-data");
  }

  static delete(route, params) {
    return this.xhr(route, params, "DELETE");
  }

  static patch(route, params) {
    return this.xhr(route, params, "PATCH");
  }

  static xhr(route, params, verb, contentType) {
    var dataOption = {};
    if (params && verb === "GET") {
      dataOption["params"] = params;
    } else {
      dataOption["data"] = params;
    }

    let options = Object.assign({ method: verb, url: route }, dataOption);
    options.headers = Api.headers(contentType);

    return axios(options).then(responseJson => {
      return responseJson.data;
    });
  }
}

function handleErrors(error) {
  var status = error.response.status;
  var data = error.response.data;
  switch (status) {
    case 401:
      clearLocal();
      window.location.href = "/login";
      throw new Error(data.message);
    case 403:
      throw new Error(data.message);
    default:
      break;
  }
  return Promise.reject(error);
}

export default Api;
