let crypto = require("crypto");
let moment = require("moment");

let getRandomValue = value => {
  let bytes = value || 16;
  return crypto.randomBytes(bytes).toString("hex");
};

let addOrganizationArray = args => {
  let returnData = [
    getRandomValue(),
    args.name,
    args.email,
    args.organization_type,
    new Date().toUTCString()
  ];

  return returnData;
};

let addRoleToOrganizationArray = args => {
  let returnData = [args.role];

  return returnData;
};

let addUserArray = args => {
  console.log("TCL: args", args);
  if (args.aadhaarId) {
    return [
      getRandomValue(),
      args.name,
      args.role,
      args.email,
      args.timestamp || new Date().toISOString(),
      args.aadhaarId
    ];
  } else {
    return [
      getRandomValue(),
      args.name,
      args.role,
      args.email,
      args.timestamp || new Date().toISOString()
    ];
  }
};

let generateUserAttributes = function(userData, enrollmentId) {
  var resultArray = [
    { name: "id", value: userData.id },
    { name: "name", value: userData.name },
    { name: "user_role", value: userData.role },
    { name: "enrollment_id", value: enrollmentId }
  ];

  return resultArray;
};

let revokeIdentityRecordArray = function(args) {
  let returnData = [args.enrollment_id, args.user_id];

  return returnData;
};

let addKYCRecordArray = function(args) {
  // console.log(moment(args.dateOfBirth).format("DD/MM/YYYY"))
  let returnData = [
    getRandomValue(),
    args.name,
    args.aadhar_number,
    JSON.stringify({ data: [args.phone_numbers] }),
    moment(args.dateOfBirth).format("DD/MM/YYYY"),
    args.birthMarks,
    args.mothersMaidenName,
    args.driversLicense,
    args.passport,
    args.cardInformation,
    args.nationality,
    args.emailAddress,
    args.loyaltyCards,
    args.preferences,
    JSON.stringify({
      data: [
        getRandomValue(),
        "Home",
        args.line1,
        args.line2,
        args.line3,
        args.city_town_village,
        args.postal_code,
        args.state_ut
      ]
    })
  ];
  if (args.status) {
    returnData.push(args.status);
  }
  // console.log(returnData)
  return returnData;
};

let updateKYCRecordArray = function(args) {
  let returnData = [
    args.id,
    args.name,
    args.aadhar_number,
    JSON.stringify({ data: args.phone_numbers })
  ];
  return returnData;
};

let addAddressToKYCArray = function(args) {
  let returnData = [
    args.kyc_id,
    getRandomValue(),
    args.type,
    args.line1,
    args.line2,
    args.line3,
    args.city_town_village,
    args.postal_code,
    args.state_ut
  ];
  return returnData;
};

let addVerificationRecordArray = function(args) {
  let returnData = [
    args.kyc_id,
    args.status,
    args.reference_verification_id ? args.reference_verification_id : ""
  ];
  return returnData;
};

let updateVerificationRecordArray = function(args) {
  let returnData = [
    args.verification_record_id,
    args.kyc_id,
    args.aadhar_number,
    args.status_update
  ];
  return returnData;
};

let createRequestArray = function(args) {
  let returnData = [args.aadhar_number];
  return returnData;
};

let approveRequestArray = function(args) {
  let returnData = [
    args.organization_id,
    args.status,
    args.timeLimit ? args.timeLimit : "",
    args.allowed ? JSON.stringify({ data: args.allowed }) : []
  ];
  return returnData;
};

let addClaimArray = function(args) {
  return [
    getRandomValue(),
    args.description,
    args.cost,
    args.organization_name
  ];
};

let updateClaimStatusArray = function(args) {
  return [args.claim_id, args.status_update];
};

let addProofToClaimArray = function(args) {
  return [getRandomValue(), args.claim_id, args.certificate_id];
};

module.exports = {
  getRandomValue,
  addOrganizationArray,
  addRoleToOrganizationArray,
  addUserArray,
  generateUserAttributes,
  revokeIdentityRecordArray,
  addKYCRecordArray,
  updateKYCRecordArray,
  addAddressToKYCArray,
  addVerificationRecordArray,
  updateVerificationRecordArray,
  createRequestArray,
  approveRequestArray,
  addClaimArray,
  updateClaimStatusArray,
  addProofToClaimArray
};
