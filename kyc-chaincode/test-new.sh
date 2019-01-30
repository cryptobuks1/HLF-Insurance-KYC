
set -ev
printf "Tests without auth"

printf "Emptying and recreating database"

curl -X DELETE http://localhost:5984/mychannel_mycc
curl -X PUT    http://localhost:5984/mychannel_mycc

sleep 3 

printf "\n\n\n\n Add Organization\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addOrganization", "InsuranceCompany1", "LIC", "lic@gmail.com", "InsuranceCompany", "Wed Jan 30 16:09:05 IST 2019"]}'

sleep 3

printf "\n\n\n\n Add New Client User\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addUser", "Client1", "John Doe", "Client", "john@doe", "Wed Jan 30 16:09:05 IST 2019", "123123123"]}'

sleep 3

printf "\n\n\n\n Add New Admin User\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addUser", "Admin1", "John Joe", "Admin", "john@doe", "Wed Jan 30 16:09:05 IST 2019", "123123123"]}'

sleep 3

printf "\n\n\n\n Add ID Record for Admin User\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addIDRecordForUser", "admin-enr1", "User-Admin1"]}'

sleep 3

printf "\n\n\n\n Add ID Record for Client User\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addIDRecordForUser", "client-enr1", "User-Client1"]}'

sleep 3

printf "\n\n\n\n5. Register Claim by Insuree\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addClaim", "claim1", "Health", "1000", "InsuranceCompany1"]}'

sleep 3

printf "\n\n\n\n6. Update Claim Status to 'Requires Proof' by Insurer\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["updateClaimStatus", "claim1", "Requires Proof"]}'

sleep 3

printf "\n\n\n\n8. Add a Proof to the claim by the Hospital(Assumptions : Certificate ID is the only proof)"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addProofToClaim", "proof1", "claim1", "certificate1"]}'

sleep 3

printf "\n\n\n\n10. Update Claim status to 'Proof Verified' by Insurer\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["updateClaimStatus", "claim1", "Proof Verified"]}'

sleep 3


printf "\n\n\n\n12. Update Claim Status to 'Processing' by Reinsurer\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["updateClaimStatus", "claim1", "Processing"]}'

sleep 3

printf "\n\n\n\n13. Insuree Gets Claim Details\n\n"
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getClaimDetails", "claim1"]}'

sleep 3

printf "\n\n\n\n15. Update Claim Status to 'Claim Approved' by Insurer\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["updateClaimStatus", "claim1", "Claim Approved"]}'

sleep 3

# Payment takes place here
# 
# After Payment Processed

printf "\n\n\n\n16. Update Claim Status to 'Granted and Reimbursed' by Insurer\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["updateClaimStatus", "claim1", "Claim Approved"]}'
