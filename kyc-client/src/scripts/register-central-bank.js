require("dotenv").config();
const KYC = require("../kyc");
let registerCentralBank = () => {
  let requestData = {
    name: "Central Bank",
    email: "priyansh.jain0246@gmail.com",
    organization_type: "CentralBank",
    created_at: new Date().toISOString()
  };
  let kyc = new KYC("admin");
  kyc
    .init()
    .then(function() {
      return kyc.addOrganization(requestData);
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
};

registerCentralBank();
