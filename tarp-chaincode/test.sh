
set -ev
printf "Tests without auth"

printf "Emptying and recreating database"

curl -X DELETE http://localhost:5984/mychannel_mycc
curl -X PUT    http://localhost:5984/mychannel_mycc

printf "\n\n\n\n Add Organization\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addOrganization", "testOrg", "Bank1", "bank@gmail.com", "Bank", "Wed Jan 30 16:09:05 IST 2019"]}'

sleep 3

printf "\n\n\n\n Add New User\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addUser", "1", "John Doe", "testRole", "john@doe", "Wed Jan 30 16:09:05 IST 2019", "123123123"]}'

sleep 3

printf "\n\n\n\n Add ID Record for User\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addIDRecordForUser", "enr1", "User-1"]}'

sleep 3

printf "\n\n\n\n Revoke Identity Record\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["revokeIdentityRecord", "enr1", "User-1"]}'

sleep 3

printf "\n\n\n\n Revoke User\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["revokeUser", "User-1"]}'

sleep 3

printf "\n\n\n\n Add KYC Record\n\n"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addKYCRecord", "kycTestID", "kycTestName", "123123123", "{\"data\":[\"9789096037\",\"8745128457\"]}", "test","test","test","test","test","test","test","test","test","test", "test", "Processed"]}'

sleep 3

printf "\n\n\n\n Add address to kyc"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["addAddressToKYC", "id", "address1",  "AddressType", "AddressLine1", "AddressLine2", "AddressLine3", "CityOrTownOrVillage", "PostalCode", "StateOrUT" ]}'

sleep 3

printf "\n\n\n\n Add VerificationRecord"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["addVerificationRecord", "id", "Initiated", "" ]}'

sleep 3

printf "\n\n\n\n UpdateVerificationRecord"
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["updateVerificationRecord", "3075fca7aa690816480dddf9ed362b9d", "id", "aadharId", "Processed" ]}'

sleep 3

printf "\n\n\n\n GetRecordIDsByAadharNumber"
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getRecordIDsByAadharNumber", "aadharId" ]}'

sleep 3

printf "\n\n\n\n GetVerificationRecordByKYCID"
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getVerificationRecordByKYCID", "id" ]}'

sleep 3

printf "\n\n\n\n GetKYCRecordDetails"
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getKYCRecordDetails", "id" ]}'

sleep 3

printf "\n\n\n\n GetAddressDetails"
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getAddressDetails", "address1" ]}'

sleep 3

printf "\n\n\n\n GetAllUsers"
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getAllUsers"]}'
