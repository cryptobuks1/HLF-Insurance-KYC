package claim

import (
	"encoding/json"
	"fmt"

	org "github.com/chaincode/organization"
	txn "github.com/chaincode/transaction"
	"github.com/chaincode/utils"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"

	"time"
)

// Claim definition
type Claim struct {
	ID             string   `json:"id"`
	Description    string   `json:"description"`
	Status         string   `json:"status"`
	Cost           string   `json:"cost"`
	InsureeID      string   `json:"insureeId"`
	UserIDs        []string `json:"userIds"`
	OrganizationID string   `json:"organizationId"`
	InsurerOrgID   string   `json:"insurerOrgId"`
	CreatedAt      string   `json:"createdAt"`
	Class          string   `json:"class"`
}

// Proof definition
type Proof struct {
	ID            string `json:"id"`
	ClaimID       string `json:"claimId"`
	CertificateID string `json:"certificateId"`
	URL           string `json:"url"`
	Class         string `json:"class"`

	// more can be accomodated according to the use case
}

// GetDetails is used to fetch details of a claim.
//
// args[0] = ID -> the claim ID
func GetDetails(APIstub shim.ChaincodeStubInterface, args []string, txnID string) sc.Response {

	existingClaimAsBytes, _ := APIstub.GetState(args[0])

	fmt.Println(existingClaimAsBytes)

	return shim.Success(existingClaimAsBytes)

}

// Add is used to register a claim and store to the state - CouchDB
//
// args : [claimId, description, cost, organizationId]
func Add(APIstub shim.ChaincodeStubInterface, args []string, txnID string, userID string, currentOrgID string) sc.Response {

	timestamp, _ := APIstub.GetTxTimestamp()
	timestampAsInt := timestamp.GetSeconds()
	isotimestamp := time.Unix(timestampAsInt, 0).Format(time.RFC3339)
	txnDetails := []string{txnID, "CA - Claim Addition", isotimestamp, "", args[0]}
	type SearchResult struct {
		Key    string           `json:"key"`
		Record org.Organization `json:"record"`
	}
	searchResultsBytes, err := utils.GetQueryResultForQueryString(APIstub, "{\"selector\": {\"$and\": [{\"name\":\""+args[3]+"\"},{\"class\": \"Organization\"}]}}")
	if err != nil {
		return shim.Error(err.Error())
	}
	searchResults := []SearchResult{}
	json.Unmarshal([]byte(searchResultsBytes), &searchResults)
	if len(searchResults) < 1 {
		return shim.Error("No org found with given name")
	}
	fmt.Println("Organization-Insurer ID is", searchResults[0].Record)
	claim := Claim{
		ID:             args[0],
		Description:    args[1],
		Status:         "Pending",
		Cost:           args[2],
		InsureeID:      userID,
		InsurerOrgID:   searchResults[0].Record.ID,
		OrganizationID: currentOrgID,
		CreatedAt:      isotimestamp,
		Class:          "Claim",
	}
	claimAsBytes, _ := json.Marshal(claim)
	APIstub.PutState(args[0], claimAsBytes)
	txn.Add(APIstub, txnDetails)

	return shim.Success(claimAsBytes)
}

// AddUser is used to add a user to a claim, so they can have access based on
// the organization they belong to.
//
// args: [claimId]
func AddUser(APIstub shim.ChaincodeStubInterface, args []string, txnID string, userID string) sc.Response {

	existingClaimAsBytes, _ := APIstub.GetState(args[0])

	claim := Claim{}
	json.Unmarshal(existingClaimAsBytes, &claim)

	if utils.StringInSlice(userID, claim.UserIDs) {
		return shim.Error("User already in Claim")
	}

	claim.UserIDs = append(claim.UserIDs, userID)

	claimAsBytes, _ := json.Marshal(claim)

	APIstub.PutState(args[0], claimAsBytes)

	timestamp, _ := APIstub.GetTxTimestamp()
	timestampAsInt := timestamp.GetSeconds()
	isotimestamp := time.Unix(timestampAsInt, 0).Format(time.RFC3339)
	txnDetails := []string{txnID, "CEA - Claim User Addition", isotimestamp, "", claim.ID}
	txn.Add(APIstub, txnDetails)

	return shim.Success(claimAsBytes)

}

// AddProof is used to add a proof to a certain claim, by
// an external entity.
//
// args : [id, claimId, certificateId]
func AddProof(APIstub shim.ChaincodeStubInterface, args []string, txnID string) sc.Response {

	proof := Proof{
		ID:            args[0],
		ClaimID:       args[1],
		CertificateID: args[2],
		URL:           args[3],
		Class:         "Proof",
	}
	proofAsBytes, _ := json.Marshal(proof)

	APIstub.PutState(args[0], proofAsBytes)
	payloadAsResponse := UpdateStatus(APIstub, []string{args[1], "Processed"}, txnID)
	if payloadAsResponse.GetMessage() != "" {
		return payloadAsResponse
	}

	return shim.Success(proofAsBytes)

}

// UpdateStatus is used to update the status of a claim, access is limited to organization
//
// args : claimId, statusUpdate
func UpdateStatus(APIstub shim.ChaincodeStubInterface, args []string, txnID string) sc.Response {
	fmt.Println("UpdateStatus Initial")
	fmt.Println(args)
	existingClaimAsBytes, _ := APIstub.GetState(args[0])

	claim := Claim{}
	json.Unmarshal(existingClaimAsBytes, &claim)

	claim.Status = args[1]

	claimAsBytes, _ := json.Marshal(claim)
	APIstub.PutState(args[0], claimAsBytes)

	timestamp, _ := APIstub.GetTxTimestamp()
	timestampAsInt := timestamp.GetSeconds()
	isotimestamp := time.Unix(timestampAsInt, 0).Format(time.RFC3339)
	txnDetails := []string{txnID, "CSU - Claim Status Update", isotimestamp, args[1], claim.ID}
	fmt.Println(txnDetails)
	fmt.Println(txn.Add(APIstub, txnDetails))
	txn.Add(APIstub, txnDetails)
	return shim.Success(claimAsBytes)

}
