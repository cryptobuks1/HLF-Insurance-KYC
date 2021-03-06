import API from '../Lib/API';
import * as Routes from '../Config/Routes';

var listKYCs = (options) => { 
  let { onSuccess, onError } = options;
  var url = Routes.LIST_KYCS;
  API.get(url).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var getClientKYC = (options) => {
  let { data, onSuccess, onError } = options;
  console.log(data)
  var url = Routes.GET_CLIENT_KYC;
  API.get(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
} 

var getInfo = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.KYC_INFO;
  API.get(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var searchAadhaar = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.SEARCH_AADHAAR;
  API.get(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var listApprovedKYCs = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.LIST_ORG_KYC;
  API.get(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var listClientApprovedRequest = (options) => {
  let { onSuccess, onError } = options;
  var url = Routes.LIST_CLIENT_APPROVED_REQUEST;
  API.get(url).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var createRequest = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.CREATE_REQUEST;
  API.post(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var processKYC = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.PROCESS;
  API.post(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var approveRequest = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.APPROVE;
  API.post(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var releaseRequest = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.RELEASE;
  API.post(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var listRequest = (options) => {
  let { onSuccess, onError } = options;
  var url = Routes.LIST_REQUEST;
  API.get(url).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var getOtherRecords = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.GET_KYC_BY_AADHAAR;
  API.get(url, { aadhar_number: data.aadhar_number}).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

var addKYC = (options) => {
  let { data, onSuccess, onError } = options;
  var url = Routes.ADD_KYC;
  API.post(url, data).then(function (data) {
    onSuccess(data);
  }).catch(function (error) {
    onError(error);
  })
}

export {
  listKYCs,
  listClientApprovedRequest,
  getInfo,
  getOtherRecords,
  getClientKYC,
  addKYC,
  processKYC,
  searchAadhaar,
  createRequest,
  listApprovedKYCs,
  listRequest,
  approveRequest,
  releaseRequest
}