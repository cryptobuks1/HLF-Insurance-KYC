// require modules
require("dotenv").config();
const express = require("express");
const Handler = require("../handler");
const card = require("../utils/import");
let query = require("url");
let Parser = require("../utils/Parser");

// Config
const router = express.Router();

// Routes
// 1. Login x
router.post("/login", function(req, res) {
  let token = card.upload(req.files.card);

  res.json({ token });
});

// 2. Add an Organization to state x
router.post("/add-organization", function(req, res) {
  let handler = new Handler("admin");
  req.body["organization_type"] = "Bank";
  handler
    .init()
    .then(function() {
      return handler.addOrganization(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 3. Add a role to the organization x
router.post("/add-role-to-org", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.addRoleToOrganization(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 4. Add a user to the state x
router.post("/add-user", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.addUser(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 6. Add Identity Record for a user x
router.post("/issue-identity", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.addIDRecordForUser(req.body.user_id);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 7. Revoke an Enrollment ID of a User x
router.post("/revoke-identity-record", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.revokeIdentityRecord(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 8. Revoke a User completely
router.post("/revoke-user", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.revokeUser(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/add-kyc-record", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.addKYCRecord(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/add-address-to-kyc", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.addAddressToKYC(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/add-verification-record", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.addVerificationRecord(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/update-verification-record", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.updateVerificationRecord(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/update-kyc-record", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.updateKYCRecord(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/create-request", function(req, res) {
  console.log("heklk");
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.createRequest(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/approve-request", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.approveRequest(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/release-request", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.approveCBBankRequest(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-users", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getAllUsers();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-user-details", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getUserDetails(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-records-by-aadhar", function(req, res) {
  console.log("came");
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getRecordIDsByAadharNumber(
        query.parse(req.url, true).query
      );
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      console.log("err", err);
      res.status(500).json({ error: err });
    });
});

router.get("/search-aadhaar", function(req, res) {
  console.log("came");
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getNameFromAadhar(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      console.log("err", err);
      res.status(500).json({ error: err });
    });
});

router.get("/get-verification-record-by-kycid", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getVerificationRecordByKYCID(
        query.parse(req.url, true).query
      );
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-kyc-record-details", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getKYCRecordDetails(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-address-details", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getAddressDetails(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-user-enrollments", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getUserEnrollments(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-current-user", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getCurrentUser();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-client-handler", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getUserRecords();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-handlers", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getAllRecords();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-user-requests", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getUserRequests();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-client-kyc", function(req, res) {
  console.log(query.parse(req.url, true).query);
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getCurrentUserKYC(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-client-approved-request", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getAllOrgRequests();
    })
    .then(function(data) {
      console.log("data", data);
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-org-requests", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.getOrgRequests();
    })
    .then(function(data) {
      data = Parser.parseOrgReq(data);
      console.log("TCL: data", data);

      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      console.log("Error", err);

      res.status(500).json({ error: err.toString() });
    });
});

router.post("/import-kyc", function(req, res) {
  let handler = new Handler(req.user);
  handler
    .init()
    .then(function() {
      return handler.importHandler(req.files.kyc.data.toString());
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// Insurance routes
// 9. Add an Claim to state x
router.post("/add-claim", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.addClaim(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 11. Update the Status of a Claim x
router.post("/update-claim-status", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.updateClaimStatus(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 12. Get Details of a Claim x
router.get("/get-claim-details", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.getClaimDetails(req.query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 13. Get Transactions for a Month x
router.get("/get-tx-details", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.getTxnsByMonth(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 14. Add Proof to a claim x
router.post("/add-proof", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.addProofToClaim(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 16. Get Details of a User x
router.get("/get-all-users", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.getAllUsers(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 17. Search organisation
router.get("/search-organisation", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.searchOrganization(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 18. Get identity records
router.get("/list-identity", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.getUserEnrollments(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 19. Get claims of a Hospital x
router.get("/get-org-claims", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.getClaimsByOrg(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 20. Get claims of a Insuree x
router.get("/get-user-claims", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.getUserClaims();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 20. Get claims of a Insurer x
router.get("/get-all-claims", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.getAllClaims(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 21. Get proof of a claim x
router.get("/get-claim-proof", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);

  handler
    .init()
    .then(function() {
      return handler.getClaimProofs(req.query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

// 21. Get status timelinex
router.get("/get-status-timeline", function(req, res) {
  let handler = new Handler(req.user);
  console.log(req.body);
  console.log(req.query.claim_id);
  handler
    .init()
    .then(function() {
      return handler.getStatusTimeline(req.query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

module.exports = router;
