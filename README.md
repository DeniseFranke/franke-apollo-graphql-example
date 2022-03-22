# franke-apollo-graphql-example
Re-acquaint with GraphQL by setting up an Apollo basic Endpoint and Client Example

## Prerequisites MacOSX
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update
brew doctor
export PATH="/usr/local/bin:$PATH"
brew install node
node -v
npm -v
brew update
brew upgrade node
npm install -g grunt-cli
```

## Use npm to initialize new project
```
npm init --yes
```

## Install two dependencies for this project: apollo-server and graphql
```
npm install --save
```

## Run the server
```
node server.js
```

The server is up/listening when you see:
```
Server ready at http://localhost:3000/
```

# Run Tests
Run the following tests using a JWT created from: http://jwtbuilder.jamiekurtz.com/
Replace the SAMPLE_JWT with your JWT created using the information provided in each test below

##Run Test 1 - GOOD (Correct Key=‘NeverShareYourSecret’, auth-provider=SSO or , email=denise@parsleyhealth.com (email domain match))
{
    "iss": "Online JWT Builder",
    "iat": 1647810723,
    "exp": 1679346723,
    "aud": "localhost:3000",
    "sub": "denise@parsleyhealth.com",
    "email": "denise@parsleyhealth.com",
    "auth-provider": “SSO”
}

###Request:
```
curl -v -H "Authorization: SAMPLE_JWT" \
http://localhost:3000/senior-parsley
```

###Response:
```
< content-type: application/json; charset=utf-8
< cache-control: no-cache
< content-length: 72
< accept-ranges: bytes
< Date: Sun, 20 Mar 2022 21:58:58 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
{"message":"You used a Valid JWT Token to access /restricted endpoint!"}
```

##Run Test 2 - BAD Key:
{
    "iss": "Online JWT Builder",
    "iat": 1647810723,
    "exp": 1679346723,
    "aud": "localhost:3000",
    "sub": "denise@parsleyhealth.com",
    "email": "denise@parsleyhealth.com",
    "auth-provider": "XYZ"
}

###Request:
```
curl -v -H "Authorization: SAMPLE_JWT" \
http://localhost:3000/senior-parsley
```

###Response:
```
* Connection #0 to host localhost left intact
{"statusCode":401,"error":"Unauthorized","message":"Invalid token format","attributes":{"error":"Invalid token format"}}
```

## Run Test 3 - BAD auth-provider:
{
    "iss": "Online JWT Builder",
    "iat": 1647810723,
    "exp": 1679346723,
    "aud": "localhost:3000",
    "sub": "denise@parsleyhealth.com",
    "email": "denise@parsleyhealth.com",
    "auth-provider": "XYZ"
}

### Request:
```
curl -v -H "Authorization: SAMPLE_JWT" \
http://localhost:3000/senior-parsley
```

###Response:
```
* Mark bundle as not supporting multiuse
< HTTP/1.1 401 Unauthorized
< WWW-Authenticate: Token error="Invalid credentials"
< content-type: application/json; charset=utf-8
< cache-control: no-cache
< content-length: 118
< Date: Sun, 20 Mar 2022 21:56:20 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
{"statusCode":401,"error":"Unauthorized","message":"Invalid credentials","attributes":{"error":"Invalid credentials"}}
```

# Run Test 4 - BAD email:
{
    "iss": "Online JWT Builder",
    "iat": 1647810723,
    "exp": 1679346723,
    "aud": "localhost:3000",
    "sub": "denise@denisefranke.com",
    "email": "denise@denisefranke.com",
    "auth-provider": "SSO"
}

### Request:
```
curl -v -H "Authorization: SAMPLE_JWT \
http://localhost:3000/senior-parsley
```

### Response:
```
< HTTP/1.1 401 Unauthorized
< WWW-Authenticate: Token error="Invalid credentials"
< content-type: application/json; charset=utf-8
< cache-control: no-cache
< content-length: 118
< Date: Sun, 20 Mar 2022 21:54:50 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
{"statusCode":401,"error":"Unauthorized","message":"Invalid credentials","attributes":{"error":"Invalid credentials"}}
```

# Next Steps
## Create routes to be protected:
https://github.com/cremalab/hapi-react-boilerplate/wiki/Authentication%3AJWT%3A-Protecting-routes-with-JWT2
## Deploy as a container with:
https://github.com/DeniseFranke/franke-apollo-graphql-example/new/main?filename=.github%2Fworkflows%2Faws.yml&workflow_template=aws  
## Or deploy with  Terraform:
https://github.com/DeniseFranke/franke-apollo-graphql-example/new/main?filename=.github%2Fworkflows%2Fterraform.yml&workflow_template=terraform

