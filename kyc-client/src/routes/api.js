// require modules
require("dotenv").config();
const express = require("express");
const KYC = require("../kyc");
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
  let kyc = new KYC("admin");
  req.body["organization_type"] = "Bank";
  kyc
    .init()
    .then(function() {
      return kyc.addOrganization(req.body);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.addRoleToOrganization(req.body);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.addUser(req.body);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.addIDRecordForUser(req.body.user_id);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.revokeIdentityRecord(req.body);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.revokeUser(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/add-kyc-record", function(req, res) {
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.addKYCRecord(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/add-address-to-kyc", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.addAddressToKYC(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/add-verification-record", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.addVerificationRecord(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/update-verification-record", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.updateVerificationRecord(req.body);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.updateKYCRecord(req.body);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.createRequest(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/approve-request", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.approveRequest(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.post("/release-request", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.approveCBBankRequest(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-users", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getAllUsers();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-user-details", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getUserDetails(query.parse(req.url, true).query);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getRecordIDsByAadharNumber(query.parse(req.url, true).query);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getNameFromAadhar(query.parse(req.url, true).query);
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getVerificationRecordByKYCID(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-kyc-record-details", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getKYCRecordDetails(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-address-details", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getAddressDetails(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-user-enrollments", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getUserEnrollments(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-current-user", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getCurrentUser();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-client-kyc", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getUserRecords();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-kycs", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getAllRecords();
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/list-user-requests", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getUserRequests();
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getCurrentUserKYC(query.parse(req.url, true).query);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

router.get("/get-client-approved-request", function(req, res) {
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getAllOrgRequests();
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.getOrgRequests();
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
  let kyc = new KYC(req.user);
  kyc
    .init()
    .then(function() {
      return kyc.importKYC(req.files.kyc.data.toString());
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.addClaim(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.updateClaimStatus(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getClaimDetails(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getTxnsByMonth(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.addProofToClaim(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getAllUsers(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.searchOrganization(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getUserEnrollments(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getClaimsByOrg(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getUserClaims(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getAllClaims(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getClaimProofs(req.body);
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
  let kyc = new KYC(req.user);
  console.log(req.body);

  kyc
    .init()
    .then(function() {
      return kyc.getStatusTimeline(req.body);
    })
    .then(function(data) {
      res.status(200).json({ response: data });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.toString() });
    });
});

module.exports = router;
