console.log(process.env);
const BASE_URL = process.env.REACT_APP_BASE_ENDPOINT + "/api";
// const BASE_URL = "http://192.168.31.126:3000/api";


const SYSTEM_PING = BASE_URL + "/system/ping";
const SIGNUP = BASE_URL + "/add-organization";
const WALLET_IMPORT = BASE_URL + "/login";
const KYC_IMPORT = BASE_URL + "/import-kyc";
const LOGOUT = BASE_URL + "/logout";
const CREATE_USER = BASE_URL + "/add-user";

const IDENTITY_ISSUE = BASE_URL + "/issue-identity";
const LIST_KYCS = BASE_URL + "/list-kycs";
const LIST_USERS = BASE_URL + "/list-users";
const CURRENT_USER_INFO = BASE_URL + "/get-current-user";
const KYC_INFO = BASE_URL + "/get-records-by-aadhar";
const GET_KYC_BY_AADHAAR = BASE_URL + "/get-records-by-aadhar";
const GET_CLIENT_KYC = BASE_URL + "/get-client-kyc";
const ADD_KYC = BASE_URL + "/add-kyc-record";
const PROCESS = BASE_URL + "/add-verification-record";
const SEARCH_AADHAAR = BASE_URL + "/search-aadhaar";
const CREATE_REQUEST = BASE_URL + "/create-request";
const LIST_ORG_KYC = BASE_URL + "/list-org-requests";
const LIST_REQUEST = BASE_URL + "/list-user-requests";
const APPROVE = BASE_URL + "/approve-request";
const LIST_CLIENT_APPROVED_REQUEST = BASE_URL + "/get-client-approved-request";
const RELEASE = BASE_URL + "/release-request";
// const SEARCH_ORGANIZATION = BASE_URL + "/search-organisation";
// const LIST_IDENTITY = BASE_URL + "/list-identity";
// const ISSUE_IDENTITY = BASE_URL + "/issue-identity";
// const REVOKE_IDENTITY = BASE_URL + "/revoke-identity-record";
// const FETCH_ALL_USERS = BASE_URL + "/get-all-users";
// const ADD_CLAIM = BASE_URL + "/add-claim";
// const GET_USER_CLAIMS = BASE_URL + "/get-user-claims";
// const GET_HOSP_CLAIMS = BASE_URL + "/get-hosp-claims";
// const GET_INSURER_CLAIMS = BASE_URL + "/get-all-claims";
// const REVOKE_USER = BASE_URL + "/revoke-user";
// const ADD_PROOF = BASE_URL + "/add-proof";
// const GET_CLAIM_PROOF = BASE_URL + "/get-claim-proof"
// const UPDATE_CLAIM_STATUS = BASE_URL + "/update-claim-status"
// const GET_STATUS_TIMELINE = BASE_URL + "/get-status-timeline"
// const GET_TX_BY_MONTH = BASE_URL + "/get-tx-details"
// const GET_CLAIM_DETAILS = BASE_URL + "/claim-info"

// // 
// const GET_MCO_CLAIMS = BASE_URL + "/list-entity-claims";
// const BATCH_LIST = BASE_URL + "/list-batch";
// const IMPORT_BATCH = BASE_URL + "/import-batch";


export {
	SYSTEM_PING,
	SIGNUP,
	WALLET_IMPORT,
	KYC_IMPORT,
	LOGOUT,
	CREATE_USER,
  IDENTITY_ISSUE,
  LIST_KYCS,
  LIST_USERS,
  CURRENT_USER_INFO,
  KYC_INFO,
	GET_KYC_BY_AADHAAR,
	APPROVE,
	GET_CLIENT_KYC,
	ADD_KYC,
	PROCESS,
	SEARCH_AADHAAR,
	CREATE_REQUEST,
	LIST_ORG_KYC,
	LIST_REQUEST,
	LIST_CLIENT_APPROVED_REQUEST,
	RELEASE
	// SEARCH_ORGANIZATION,
	// LIST_IDENTITY,
	// REVOKE_IDENTITY,
	// FETCH_ALL_USERS,
	// ISSUE_IDENTITY,
	// ADD_CLAIM,
	// GET_USER_CLAIMS,
	// REVOKE_USER,
	// GET_HOSP_CLAIMS,
	// ADD_PROOF,
	// GET_INSURER_CLAIMS,
	// GET_CLAIM_PROOF,
	// UPDATE_CLAIM_STATUS,
	// GET_STATUS_TIMELINE,
	// GET_TX_BY_MONTH,
	// GET_CLAIM_DETAILS,
	// // 
	// GET_MCO_CLAIMS,
	// BATCH_LIST,
	// IMPORT_BATCH
};