# TARP Project - Blockchain KYC + Insurance

## Steps to set-up

- Install [cURL](https://curl.haxx.se/download.html)
- Install [Docker](https://www.docker.com/get-started)
- Install [GoLang](https://golang.org/dl/)
- Install [NodeJS](https://nodejs.org/en/download/)
- Install Python

```sh
sudo apt-get install python
```

- Install Binaries

```
curl -sSL http://bit.ly/2ysbOFE | bash -s 1.1.0
export PATH=<path to download location>/bin:$PATH
```

## Steps to run (Working as of this commit)

Network and Server

```sh
./master-backend.sh
```

In a seperate terminal, Frontend

```sh
./master-frontend.sh
```

## Steps to use

- Login as Central bank with card found in kyc-client/cards folder
- In the users tab, create a new user, role client.
- Now the card for user is generated. Logout and login as the user.
- Fill in the KYC details.
- Log back in as central bank, process the KYC record.
- Log out and create an organization by signing up.
- Log in and search for the user by aadhar number.
- request for their kyc.
- Log in as user and approve the request.
- Log in as central bank and release the details.
- Log in as org and see the details.

## Steps to stop

```sh
./master-stop.sh
```
