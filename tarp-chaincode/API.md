
### Add Organization    
**Function-Name** :`addOrganization` <br>
**Params** : 

- id
- name
- email
- type

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addOrganization", "org1", "Bank1", "bank@gmail.com", "Bank"]}'
```
<!-- <br>     -->
### Add a User
**Function-Name** :`addUser` <br>
**Params** :

- id
- name
- email
- role

Note : The prefix `User-` gets added to the ID.

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addUser", "addUser1", "JonSnow", "email", "testRole"]}'
```
<!-- <br>    -->
### Add an Identity Record for a user
**Function-Name** :`addIDRecordForUser` <br>
**Params** :

- newEnrollmentId
- userId

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addIDRecordForUser", "enr1", "User-addUser1"]}'
```
<!-- <br>                 -->
### Revoke an Identity record of a user
**Function-Name** :`revokeIdentityRecord` <br>
**Params** :

- enrollmentId
- userId

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["revokeIdentityRecord", "enr1", "User-addUser1"]}'
```
<!-- <br>          -->
### Revoke User
**Function-Name** :`revokeUser` <br>
**Params** :

- userId

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["revokeUser", "User-addUser1"]}'
```
<!-- <br>    -->
### Add a KYC record          
**Function-Name** :`addKYCRecord` <br>
**Params** :

- id
- name
- aadharId
- phoneNumbers(stringified array)
    - Example : `{\"data\":[\"9789096037\",\"8745128457\"]}"]}`

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args" : ["addKYCRecord", "someKycId", "name", "aadharId", "{\"data\":[\"9789096037\",\"8745128457\"]}"]}'
```
<!-- <br>    -->
### Add an address for a KYC Record       
**Function-Name** :`addAddressToKYC` <br>
**Params** :

- kycID
- ID
- AddressType
- AddressLine1
- AddressLine2
- AddressLine3
- CityOrTownOrVillage
- PostalCode
- StateOrUT

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["addAddressToKYC", "someKycId", "address1",  "sometype", "someLine1", "someLine2", "someLine3", "someCity", "postalCode", "someState" ]}'
```
<!-- <br>    -->
### Add a verification record for a KYC     
**Function-Name** :`addVerificationRecord` <br>
**Params** :

- kycId
- Status
- reference VerificationRecordID

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["addVerificationRecord", "someKycId", "Initiated", "" ]}'
```
<!-- <br>    -->
### Update a verification record for a KYC
**Function-Name** :`updateVerificationRecord` <br>
**Params** :

- verificationRecordID
- kycID
- aadharId
- statusUpdate

#### Example Usage
```bash
docker exec -it cli peer chaincode invoke -C mychannel -n mycc -c '{"Args":["updateVerificationRecord", "3075fca7aa690816480dddf9ed362b9d", "someKycId", "aadharId", "Processed" ]}'
```
<!-- <br>    -->
### Get RecordIDs by Aadhar Number
**Function-Name** :`getRecordIDsByAadharNumber` <br>
**Params** :

- aadharNumber

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getRecordIDsByAadharNumber", "aadharId" ]}'
```
<!-- <br>      -->
### Get Verification Record by KYCID
**Function-Name** :`getVerificationRecordByKYCID` <br>
**Params** :

- kycId

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getVerificationRecordByKYCID", "someKycId" ]}'
```
<!-- <br>      -->
### Get Details of a KYC record
**Function-Name** :`getKYCRecordDetails` <br>
**Params** :

- kycId

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getKYCRecordDetails", "someKycId" ]}'
```
<!-- <br>         -->
### Get address details by addressID       
**Function-Name** :`getAddressDetails` <br>
**Params** :

- addressId

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getAddressDetails", "address1" ]}'
```
<!-- <br>    -->

### Get user details by userId       
**Function-Name** :`getAddressDetails` <br>
**Params** :

- userId

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getUserDetails", "User-addUser1" ]}'
```

### Get user Enrollments       
**Function-Name** :`getUserEnrollments` <br>

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getUserEnrollments", ]}'
```

### Get All users of the organization       
**Function-Name** :`getAllUsers` <br>

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getAllUsers"]}'
```

### Get All Records of the organization       
**Function-Name** :`getAllRecords` <br>

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getAllRecords"]}'
```

### Get All Records of the User       
**Function-Name** :`getUserRecords` <br>

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getUserRecords"]}'
```

### Get All Records of the Current User       
**Function-Name** :`getCurrentUserKYC` <br>

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getCurrentUserKYC"]}'
```

### Get Requests for User KYC       
**Function-Name** :`getUserRequests` <br>

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getUserRequests"]}'
```

### Get Requests made by Org for User KYC       
**Function-Name** :`getOrgRequests` <br>

#### Example Usage
```bash
docker exec -it cli peer chaincode query -C mychannel -n mycc -c '{"Args":["getOrgRequests"]}'
```