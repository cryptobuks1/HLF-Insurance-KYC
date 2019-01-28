let fabricClient = require("./config/fabric-client");
let card = require("./utils/export");
const csv = require('csvtojson')
// let FabricCAClient = require('fabric-ca-client');
let config = require("./utils/config");
let remote = require("./utils/fetchFromRemote");
let Variables = require("./utils/variables");
let parseArgs = require("./utils/parse-args");

class KYC {
  constructor(userName) {
    this.currentUser;
    this.issuer;
    this.userName = userName;
    this.connection = fabricClient;
  }

  init() {
    let isAdmin = false;
    if (this.userName == "Admin") {
      isAdmin = true;
    }
    return this.connection
      .initCredentialStores()
      .then(() => {
        return this.connection.getUserContext(this.userName, true);
      })
      .then(user => {
        this.issuer = user;
        if (isAdmin) {
          return user;
        }
        return user;
        // return this.ping();
      })
      .then(user => {
        this.currentUser = user;
        return user;
      });
  }

  addOrganization(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addOrganization",
      args: parseArgs.addOrganizationArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    console.log(requestData)
    return this.connection.submitTransaction(requestData).then(data => {
      return this.createUserCard(data[0], args.email);
    });
  }

  addRoleToOrganization(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addRoleToOrganization",
      args: parseArgs.addRoleToOrganizationArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  addUser(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addUser",
      args: parseArgs.addUserArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData).then(data => {
      return this.createUserCard(data, args.email);
    });
  }

  addIDRecordForUser(userId) {
    let tx_id = this.connection.newTransactionID();
    let enrollmentId = userId + parseArgs.getRandomValue(4);
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addIDRecordForUser",
      args: [enrollmentId, userId],
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  revokeIdentityRecord(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "revokeIdentityRecord",
      args: parseArgs.revokeIdentityRecordArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  revokeUser(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "revokeUser",
      args: [args.user_id],
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  getAllUsers(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getAllUsers",
      args: [],
      txId: tx_id,
      chainId: config.chainId
    };
    console.log(requestData);
    return this.connection.submitTransaction(requestData);
  }

  getUserRecords(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getUserRecords",
      args: [],
      txId: tx_id,
      chainId: config.chainId
    };
    console.log(requestData);
    return this.connection.submitTransaction(requestData);
  }

  getAllRecords(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getAllRecords",
      args: []
    };
    return this.connection.query(requestData);
  }

  async addKYCRecord(args) {
    let tx_id = this.connection.newTransactionID();
    // let remoteResponse = await remote.fetch(args.aadhar_number)
    // console.log("response " , remoteResponse)
    if (!args.status) {
      args['status'] = 'Processed' 
    }
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addKYCRecord",
      args: parseArgs.addKYCRecordArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    console.log(requestData);
    return this.connection.submitTransaction(requestData);
  }

  async importKYC(csvStr) {
    let kyc = null;
    try {
      kyc = await csv()
        .fromString(csvStr)
        .then((jsonObj) => {
          return jsonObj
        })
      console.log("KYC", kyc)
      console.log("-------------------------------")
      try {

        for (let i=0; i<kyc.length; i++) {
          let requestData = {
            name : kyc[i].name.trim(),
            aadhar_number: kyc[i].aadharId.trim(),
            phone_numbers: kyc[i].phoneNumbers.trim(),
            dateOfBirth: kyc[i].dateOfBirth.trim(),
            birthMarks: kyc[i].birthMarks.trim(),
            mothersMaidenName: kyc[i].mothersMaidenName.trim(),
            driversLicense: kyc[i].driversLicense.trim(),
            passport: kyc[i].passport.trim(),
            cardInformation: kyc[i].cardInformation.trim(),
            nationality: kyc[i].nationality.trim(),
            emailAddress: kyc[i].emailAddress.trim(),
            loyaltyCards: kyc[i].loyaltyCards.trim(),
            preferences: kyc[i].preferences.trim(),
            line1: kyc[i].AddressLine1.trim(),
            line2: kyc[i].AddressLine2.trim(),
            line3: kyc[i].AddressLine3.trim(),
            city_town_village: kyc[i].city_town_village.trim(),
            postal_code: kyc[i].postalCode.trim(),
            state_ut: kyc[i].state_ut.trim()
          }
          await this.addKYCRecord(requestData)
          console.log(`---------------Imported KYC ${i + 1} off ${kyc.length}---------------`)
        }
        return "File Imported!"
      } catch (error) {
        throw new Error(error)
      }
    } catch (error) {
      throw new Error("Unable to parse file")
    }
  }

  updateKYCRecord(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "updateKYCRecord",
      args: parseArgs.updateKYCRecordArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  addAddressToKYC(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addAddressToKYC",
      args: parseArgs.addAddressToKYCArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  addVerificationRecord(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addVerificationRecord",
      args: parseArgs.addVerificationRecordArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  updateVerificationRecord(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "updateVerificationRecord",
      args: parseArgs.updateVerificationRecordArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  createRequest(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addRequestForRecord",
      args: parseArgs.createRequestArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    console.log(requestData)
    return this.connection.submitTransaction(requestData);
  }

  approveRequest(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "approveBankRequest",
      args: parseArgs.approveRequestArray(args),
      txId: tx_id,
      chainId: config.chainId
    };
    console.log(requestData)
    return this.connection.submitTransaction(requestData);
  }

  approveCBBankRequest(args) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "approveCBBankRequest",
      args: [args.userId, args.organization_id, args.status],
      txId: tx_id,
      chainId: config.chainId
    };
    console.log(requestData)
    return this.connection.submitTransaction(requestData);
  }

  getUserDetails(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getUserDetails",
      args: [args.user_id]
    };
    return this.connection.query(requestData);
  }

  getRecordIDsByAadharNumber(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getRecordIDsByAadharNumber",
      args: [args.aadhar_number]
    };
    console.log(args);
    return this.connection.query(requestData);
  }

  getNameFromAadhar(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getNameFromAadhar",
      args: [args.aadhar_number]
    };
    console.log(requestData)
    return this.connection.query(requestData);
  }

  getCurrentUserKYC(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getCurrentUserKYC",
      args: [args.aadhaarId]
    };
    return this.connection.query(requestData);
  }

  getAllOrgRequests() {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getAllOrgRequests",
      args: []
    };
    console.log(requestData)
    return this.connection.query(requestData);
  }

  getVerificationRecordByKYCID(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getVerificationRecordByKYCID",
      args: [args.kyc_id]
    };
    return this.connection.query(requestData);
  }

  getKYCRecordDetails(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getKYCRecordDetails",
      args: [args.kyc_id]
    };
    return this.connection.query(requestData);
  }

  getAddressDetails(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getAddressDetails",
      args: [args.address_id]
    };
    return this.connection.query(requestData);
  }

  getUserEnrollments(args) {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getUserEnrollments",
      args: [args.user_id]
    };
    return this.connection.query(requestData);
  }

  getCurrentUser() {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getCurrentUser",
      args: []
    };
    return this.connection.query(requestData);
  }

  getUserRequests() {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getUserRequests",
      args: []
    };
    return this.connection.query(requestData);
  }

  getOrgRequests() {
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "getOrgRequests",
      args: []
    };
    console.log(requestData)
    return this.connection.query(requestData);
  }

  createIdentityRecord(enrollmentId, userId) {
    let tx_id = this.connection.newTransactionID();
    let requestData = {
      chaincodeId: config.chaincodeId,
      fcn: "addIDRecordForUser",
      args: [enrollmentId, userId],
      txId: tx_id,
      chainId: config.chainId
    };
    return this.connection.submitTransaction(requestData);
  }

  createUserCard(userData, email) {
    var fabricCAClient = this.connection.getCertificateAuthority();
    console.log(userData);
    var attrs, reqAttrs, result;
    var enrollmentID = userData.id + parseArgs.getRandomValue(4);
    if (userData.user_role === "Admin") {
      attrs = Variables.adminRoleAttrs.concat(
        parseArgs.generateUserAttributes(userData, enrollmentID)
      );
      reqAttrs = Variables.userReqAttrs.concat(Variables.adminRoleReqAttrs);
    } else {
      attrs = Variables.userRoleAttrs.concat(
        parseArgs.generateUserAttributes(userData, enrollmentID)
      );
      reqAttrs = Variables.userReqAttrs.concat(Variables.userRoleReqAttrs);
    }
    return this.createIdentityRecord(enrollmentID, userData.id)
      .then(data => {
        result = data;

        return fabricCAClient.register(
          {
            enrollmentID: enrollmentID,
            affiliation: config.affliation,
            attrs: attrs
          },
          this.issuer
        );
      })
      .then(secret => {
        return fabricCAClient.enroll({
          enrollmentID: enrollmentID,
          enrollmentSecret: secret,
          attr_reqs: reqAttrs
        });
      })
      .then(enrollment => {
        return this.connection.createUser({
          username: enrollmentID,
          mspid: this.connection.getMspid(),
          cryptoContent: {
            privateKeyPEM: enrollment.key.toBytes(),
            signedCertPEM: enrollment.certificate
          }
        });
      })
      .then(user => {
        return this.connection.setUserContext(user);
      })
      .then(user => {
        card.compress(userData.name, user._name, email);
      })
      .then(() => {
        return result;
      });
  }
}

module.exports = KYC;
